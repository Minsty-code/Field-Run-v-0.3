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

    function startTracking() {

        if (!isRunning) {
            
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
                
                isRunning = true;
                
            } else {
                
                alert("GPS non disponible sur ce navigateur");
            }
        }

    }

    function stopTracking() {
        if (isRunning) {
            navigator.geolocation.clearWatch(watchId)
        }

        isRunning = false;

    }

    function onPositionUpdate(position) {

//Récupère les coordonnées
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
//Récupère la précision en mètres
        const accuracy = position.coords.accuracy;

        coords.push([lat, lon]);
        
        updateMarker(lat, lon);
        
        updateAccuracyCircle(lat, lon, accuracy);
        
        updateLine(coords);

        if (firstFix) {
            map.setView([lat, lon], 16); // centre + zoom fort
            firstFix = false;
            hideLoader();
        } else {
            map.panTo([lat, lon]);       // déplacement doux
        }

    }

    function handleError(error) {
        alert("GPS refusé ou indisponible");
    }