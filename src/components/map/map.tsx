import React, { useRef, useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../consts';
import 'leaflet/dist/leaflet.css';
import './map.css';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

interface IMapProps {
  selectedPointId?: string;
}

const Map: React.FC<IMapProps> = ({ selectedPointId }) => {
  const filtredOffers = useAppSelector((state) => state.filtredOffers);
  const mapRef = useRef<null | HTMLDivElement>(null);
  const map = useMap(mapRef, filtredOffers[0]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      if (filtredOffers.length) {
        filtredOffers.forEach((el) => {
          const marker = new Marker({
            lat: el.city.location.latitude,
            lng: el.city.location.longitude,
          });

          marker
            .setIcon(
              selectedPointId && el.id === selectedPointId
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);
        });
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, filtredOffers, selectedPointId]);

  return <div className="map-size" ref={mapRef}></div>;
};

export default Map;
