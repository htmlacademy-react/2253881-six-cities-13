import React, { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../consts';
import 'leaflet/dist/leaflet.css';
import './map.css';
import { IOffer } from '../../types/offers';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [29, 39],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [29, 39],
  iconAnchor: [20, 40],
});

interface IMapProps {
  selectedPointId?: string;
  offers: Array<IOffer>;
}

const Map: React.FC<IMapProps> = ({ selectedPointId, offers }) => {
  const mapRef = useRef<null | HTMLDivElement>(null);
  const map = useMap(mapRef, offers[0]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((el) => {
        const marker = new Marker({
          lat: el.location.latitude,
          lng: el.location.longitude,
        });

        marker
          .setIcon(
            selectedPointId && el.id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      map.flyTo(
        [offers[0].city.location.latitude, offers[0].city.location.longitude],
        offers[0].city.location.zoom
      );

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPointId]);

  return <div className="map-size" ref={mapRef}></div>;
};

export default Map;
