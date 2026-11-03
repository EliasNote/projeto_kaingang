import React, { useCallback, useEffect, useState } from "react";
import { Compass, ArrowLeft } from "lucide-react";
import { TourData, EditorMode } from "./virtual-tour/types";
import { DEFAULT_TOUR } from "./virtual-tour/data/defaultTour";
import { Header } from "./virtual-tour/components/Header";
import { Viewer360 } from "./virtual-tour/components/Viewer360";
import { InteractiveFloorPlan } from "./virtual-tour/components/InteractiveFloorPlan";
import { FloorPlanEditor } from "./virtual-tour/components/FloorPlanEditor";

const STORAGE_KEY = "kaingang_virtual_tour_data";

export default function VirtualVisitsPage() {
  const [tourData, setTourData] = useState<TourData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as TourData;
        if (parsed.points?.length > 0 && parsed.floorPlan) return parsed;
      }
    } catch (error) {
      console.warn("Não foi possível carregar o tour salvo; usando o tour padrão.", error);
    }
    return DEFAULT_TOUR;
  });
  const [mode, setMode] = useState<EditorMode>("view");
  const [currentPointId, setCurrentPointId] = useState(
    tourData.startingPointId || tourData.points[0]?.id || "p1",
  );
  const [cameraHeading, setCameraHeading] = useState(0);
  const [cameraFov, setCameraFov] = useState(75);
  const [showFloorArrows, setShowFloorArrows] = useState(true);
  const [isFloorPlanExpanded, setIsFloorPlanExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tourData));
  }, [tourData]);

  useEffect(() => {
    if (!tourData.points.some((point) => point.id === currentPointId)) {
      setCurrentPointId(tourData.points[0]?.id || "p1");
    }
  }, [tourData.points, currentPointId]);

  const currentPoint =
    tourData.points.find((point) => point.id === currentPointId) ||
    tourData.points[0];

  const handleCameraHeadingChange = useCallback(
    (heading: number, fov: number) => {
      setCameraHeading(heading);
      setCameraFov(fov);
    },
    [],
  );

  const handleDeleteHotspot = (hotspotId: string) => {
    if (!currentPoint) return;
    setTourData((previous) => ({
      ...previous,
      points: previous.points.map((point) =>
        point.id === currentPoint.id
          ? {
              ...point,
              hotspots: (point.hotspots || []).filter(
                (hotspot) => hotspot.id !== hotspotId,
              ),
            }
          : point,
      ),
    }));
  };

  const returnToSite = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="flex h-screen w-full select-none flex-col overflow-hidden bg-[#101812] text-neutral-900">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#101812] px-4 py-2 backdrop-blur-md">
        <button
          type="button"
          onClick={returnToSite}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </button>
        <div className="hidden items-center gap-2 text-xs font-semibold text-white/60 sm:flex">
          <Compass className="h-4 w-4" />
          Memórias da Escola Indígena
        </div>
        <div className="w-24 sm:w-40" />
      </div>

      <Header
        mode={mode}
        onSetMode={setMode}
        tourTitle={tourData.title}
        points={tourData.points}
        currentPointId={currentPointId}
        onSelectPoint={setCurrentPointId}
      />

      <main className="relative w-full flex-1 overflow-hidden bg-neutral-950">
        {mode === "view" ? (
          <div className="relative h-full w-full">
            {currentPoint ? (
              <Viewer360
                currentPoint={currentPoint}
                allPoints={tourData.points}
                onNavigateToPoint={setCurrentPointId}
                onCameraHeadingChange={handleCameraHeadingChange}
                showFloorArrows={showFloorArrows}
                onToggleFloorArrows={() => setShowFloorArrows((value) => !value)}
                onDeleteHotspot={handleDeleteHotspot}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-400">
                Nenhum ponto 360 disponível.
              </div>
            )}
            <div className="pointer-events-auto absolute bottom-6 left-6 z-20">
              <InteractiveFloorPlan
                tourData={tourData}
                currentPointId={currentPointId}
                cameraHeadingRad={cameraHeading}
                cameraFovDeg={cameraFov}
                onSelectPoint={setCurrentPointId}
                isExpanded={isFloorPlanExpanded}
                onToggleExpand={() => setIsFloorPlanExpanded((value) => !value)}
              />
            </div>
          </div>
        ) : (
          <FloorPlanEditor
            tourData={tourData}
            onUpdateTourData={setTourData}
            onLaunchTour={(startingPointId) => {
              if (startingPointId) setCurrentPointId(startingPointId);
              setMode("view");
            }}
          />
        )}
      </main>
    </div>
  );
}
