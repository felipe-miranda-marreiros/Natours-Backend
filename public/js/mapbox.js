/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWlyYW5kYWx1eCIsImEiOiJjbDNpMXZiczYweHl3M2J3MXFlYWo3bGhpIn0.NLTdOra70DP3DNJN5hgyIA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mirandalux/cl3imk9rq000314np7p7wetiy',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const htmlEl = document.createElement('div');
    htmlEl.className = 'marker';

    new mapboxgl.Marker({
      element: htmlEl,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
      focusAfterOpen: false
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}<p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
