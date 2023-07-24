import React, { useEffect, useState, useRef } from 'react';
import leaflet from 'leaflet';
import { Map } from 'leaflet';
import { TILE_LAYER_ULR } from '../consts';
import { IOffer } from '../types/offers';

export default function useMap(
  mapRef: React.MutableRefObject<HTMLElement | null>,
  offer: IOffer
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude,
        },
        zoom: offer.city.location.zoom,
      });

      leaflet
        .tileLayer(TILE_LAYER_ULR, {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        })
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, offer]);

  return map;
}
