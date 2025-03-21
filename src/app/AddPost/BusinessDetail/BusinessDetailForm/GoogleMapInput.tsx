import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../style.css";
import { CiSearch } from "react-icons/ci";
import { setLocation } from "@/app/storeApp/Slice/locationSlice";
import { useGoogleMaps } from "@/app/hooks/useGoogleMaps";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";

const GooglemapInput = () => {
  const dispatch = useDispatch();
  const googleLoaded = useGoogleMaps();

  const location = useAppSelector((state) => {
    return state.location;
  });

  const lat = Cookies.get("lat");
  const lon = Cookies.get("lon");

  console.log(" my google location @!@ ", location.selectedLocation);

  useEffect(() => {
    if (googleLoaded) {
      initAutocomplete();
    }
  }, [googleLoaded]);

  function initAutocomplete() {
    if (!window.google) return;

    const latFromCookie = parseFloat(Cookies.get("lat")) || 23.0225;
    const lonFromCookie = parseFloat(Cookies.get("lon")) || 72.5714;

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latFromCookie, lng: lonFromCookie },
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

        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          title: place.formatted_address,
        });

        markers.push(marker);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        // Save selected location to Redux & Cookies
        dispatch(
          setLocation({
            name: place.formatted_address,
            location: place.geometry.location,
            vicinity: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          })
        );

        Cookies.set("lat", place.geometry.location.lat(), { expires: 7 });
        Cookies.set("lon", place.geometry.location.lng(), { expires: 7 });
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
