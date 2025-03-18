import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../style.css";
import { CiSearch } from "react-icons/ci";
import { setLocation } from "@/app/storeApp/Slice/locationSlice";
import { useGoogleMaps } from "@/app/hooks/useGoogleMaps";
import { useAppSelector } from "@/app/hooks/hooks";

const GooglemapInput = () => {
  const dispatch = useDispatch();
  const googleLoaded = useGoogleMaps();


  const location =  useAppSelector((state)=>{
    return state.location
  })


  console.log(" my google location @!@ ", location.selectedLocation)

  useEffect(() => {
    if (googleLoaded) {
      initAutocomplete();
    }
  }, [googleLoaded]);

  function initAutocomplete() {
    if (!window.google) return;

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 23.0225, lng: 72.5714 },
      zoom: 10,
      mapTypeId: "roadmap",
    });

    const input = document.getElementById("pac-input");
    if (!input) return;

    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (!places.length) return;

      markers.forEach((marker) => marker.setMap(null));
      markers = [];

      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) return;

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        const marker = new google.maps.Marker({
          map,
          icon,
          title: place.formatted_address,
          position: place.geometry.location,
        });

        markers.push(marker);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }



        // Dispatch selected location to Redux
        dispatch(
          setLocation({
            name: place.formatted_address,
            location: place.geometry.location,
            vicinity: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          })
        );
      });

      map.fitBounds(bounds);
    });
  }

  return (
    <div className="flex h-[25rem] md:h-[20rem] xl:h-full w-full flex-col rounded-xl">
      <div className="relative flex w-full items-center justify-center p-4">
        <div className="relative">
          <input
            id="pac-input"
            className="input-important w-full md:w-[70%]  xl:w-[80%] 2xl:w-[70%] rounded-lg border p-4 pl-10 text-sm outline-none"
            type="text"
            placeholder="Search for area, street name "
          />
          <CiSearch className="absolute  responsivedesingicon  bottom-[-4.5rem] md:bottom-[-5.7rem] left-[-9rem] md:left-[-16.5rem] lg:left-[-23rem] xl:left-[-9.5rem] 2xl:left-[-12rem] z-20 -translate-y-1/2 transform text-xl text-gray-500" />
        </div>
      </div>
      <div id="map" className="flex-1 rounded-xl"></div>
    </div>
  );
};

export default GooglemapInput;
