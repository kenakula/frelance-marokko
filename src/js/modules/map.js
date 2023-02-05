export const initMap = async () => {
  const mapContainer = document.querySelector('#contacts-map');

  if (!mapContainer) {
    return;
  }

  const map = window.ymaps;

  const init = () => {
    const myMap = new window.ymaps.Map('contacts-map', {
      center: [60.021288, 30.277664],
      zoom: 17,
    });

    const defaultPinUrl = mapContainer.dataset.defaultPin;
    const mapPinUrl = mapContainer.dataset.mapPin;

    if (!defaultPinUrl || !mapPinUrl) {
      return;
    }

    const placemarkPin = new map.Placemark(
      [60.021288, 30.277664],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: mapPinUrl,
        iconImageSize: [32, 32],
        iconImageOffset: [-15, -30],
      },
    );

    const defaultPlacemark = new map.Placemark(
      [60.021288, 30.277664],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: defaultPinUrl,
        iconImageSize: [62, 52],
        iconImageOffset: [-40, -60],
      },
    );

    const zoom = myMap.getZoom();

    if (zoom >= 17) {
      myMap.geoObjects.add(defaultPlacemark);
    } else {
      myMap.geoObjects.add(placemarkPin);
    }

    myMap.events.add('boundschange', () => {
      const zoom = myMap.getZoom();

      if (zoom >= 17) {
        myMap.geoObjects.remove(placemarkPin);
        myMap.geoObjects.add(defaultPlacemark);
      } else {
        myMap.geoObjects.remove(defaultPlacemark);
        myMap.geoObjects.add(placemarkPin);
      }
    });
  };

  map.ready(init);
};
