//====================
//Lancement
//====================
        
    document.addEventListener("DOMContentLoaded", () => {
        
        showLoader();
        
        initMap();
        initMarker();
        initTrackingLine();

        startTracking();

        hideLoader();
        
        const Btnstart = document.getElementById('Btnstart');
        const Btnstop = document.getElementById('Btnstop');
    
        Btnstart.addEventListenr("click", startTracking)
        Btnstop.addEventListener("click", stopTracking)
    
    });