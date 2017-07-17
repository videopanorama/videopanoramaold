

function vidSetup() {
    for (i = 0; i < ntiles; i++) {
        videojs(i.toString(), {loop: true, loadingSpinner: false});
   }
}
