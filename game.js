//====================
//Variables
//====================

//Tableau d'historique de position
        let coords = [];
//En train de jouer ?
        let isRunning = false;
//Watch Position
        let watchId;
//Première initialisation
        let firstFix = true;

//====================
//Fonctions
//====================
    function showLoader(){
        document.documentElement.style.setProperty("--loader-visible", "1");
    }

    function hideLoader() {
        document.documentElement.style.setProperty("--loader-visible", "0");
    }

    function startGPS() {
        if ("geolocation" in navigator) {                              
//watchPosition = surveille la position en continu
            watchId = navigator.geolocation.watchPosition( //-----------------------------WATCH POSITION
                onPositionUpdate,
                handleError,
                
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 75000
                }
            );
            
        } else {
                
                alert("GPS non disponible sur ce navigateur");
            }
    }
    function startTracking() {
            alert ("Tracking ON");

        isRunning = true;
        coords = [];
        line.setLatLngs([]);
    }
        
    function stopTracking() {
        isRunning = false;
    }

    function onPositionUpdate(position) {

        showLoader();
//Récupère les coordonnées
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
//Récupère la précision en mètres
        const accuracy = position.coords.accuracy;

        updateMarker(lat, lon);
        
        updateAccuracyCircle(lat, lon, accuracy);
        
        if (isRunning) {
            coords.push([lat, lon]);
            updateLine(coords);
        }

        hideLoader();
        if(map) {
            if (firstFix) {
                map.setView([lat, lon], 16); // centre + zoom fort
                firstFix = false;
                hideLoader();
            } else {
                map.panTo([lat, lon]);       // déplacement doux
            }

        }
    }

    function handleError(error) {
        alert("GPS refusé ou indisponible");
    }
