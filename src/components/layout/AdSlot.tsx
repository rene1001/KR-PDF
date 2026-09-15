import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../../i18n/useTranslation';

export type AdPlacement = 'top' | 'middle' | 'sidebar' | 'bottom' | 'after-process';

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement, className = '' }) => {
  const { t } = useTranslation();
  const adRef = useRef<HTMLDivElement>(null);
  const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // If real AdSense script is enabled and client ID is provided
    if (adsenseClientId && typeof window !== 'undefined') {
      try {
        const win = window as any;
        (win.adsbygoogle = win.adsbygoogle || []).push({});
      } catch (e) {
        // Suppress adsbygoogle push errors
      }
    }
  }, [adsenseClientId]);

  // Dimension & style definitions by placement
  const placementConfigs: Record<
    AdPlacement,
    { dimensions: string; containerStyle: string; label: string }
  > = {
    top: {
      dimensions: 'w-full max-w-[728px] h-[90px]',
      containerStyle: 'my-4 mx-auto py-2',
      label: 'Leaderboard (728x90)',
    },
    middle: {
      dimensions: 'w-full max-w-[728px] min-h-[90px]',
      containerStyle: 'my-8 mx-auto py-3',
      label: 'Responsive In-Content Banner',
    },
    sidebar: {
      dimensions: 'w-full max-w-[300px] h-[250px]',
      containerStyle: 'my-4 mx-auto',
      label: 'Medium Rectangle (300x250)',
    },
    bottom: {
      dimensions: 'w-full max-w-[728px] h-[90px]',
      containerStyle: 'mt-8 mb-4 mx-auto',
      label: 'Footer Display (728x90)',
    },
    'after-process': {
      dimensions: 'w-full max-w-[468px] min-h-[60px]',
      containerStyle: 'mt-6 mx-auto pt-2 border-t border-slate-100',
      label: 'Sponsored Partner Banner',
    },
  };

  const config = placementConfigs[placement];

  return (
    <aside
      ref={adRef}
      className={`flex flex-col items-center justify-center ${config.containerStyle} ${className}`}
      aria-label="Sponsored advertisement"
    >
      <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
        <span>{t.adPlaceholder}</span>
        <span className="px-1 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[9px]">
          {t.adBadge}
        </span>
      </div>

      {adsenseClientId ? (
        /* Real AdSense Ad Unit */
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={adsenseClientId}
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        /* Clean, policy-compliant Ad Slot Placeholder for high-CTR placement */
        <div
          className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3 text-center ${config.dimensions}`}
        >
          <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Google AdSense Ready Placement</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1">
            {config.label}
          </span>
        </div>
      )}
    </aside>
  );
};
