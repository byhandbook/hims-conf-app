import * as deepar from "deepar";
import Carousel from "./carousel.js";

// Log the version. Just in case.
console.log("Deepar version: " + deepar.version);

// Top-level await is not supported.
// So we wrap the whole code in an async function that is called immediatly.
(async function () {
  // Get the element you want to place DeepAR into. DeepAR will inherit its width and height from this and fill it.
  const previewElement = document.getElementById("ar-screen");

  // trigger loading progress bar animation
  const loadingProgressBar = document.getElementById("loading-progress-bar");
  loadingProgressBar.style.width = "100%";

  // All the effects are in the public/effects folder.
  // Here we define the order of effect files.
  const effectList = [
    "effects/ray-ban-wayfarer.deepar",
    "effects/viking_helmet.deepar",
    "effects/MakeupLook.deepar",
    "effects/Split_View_Look.deepar",
    "effects/flower_face.deepar",
    "effects/Stallone.deepar",
    "effects/galaxy_background_web.deepar",
    "effects/Humanoid.deepar",
    "effects/Neon_Devil_Horns.deepar",
    "effects/Ping_Pong.deepar",
    "effects/Pixel_Hearts.deepar",
    "effects/Snail.deepar",
    "effects/Hope.deepar",
    "effects/Vendetta_Mask.deepar",
    "effects/Fire_Effect.deepar",
  ];

  let deepAR = null;

  // Initialize DeepAR with an effect file.
  try {
    deepAR = await deepar.initialize({
      licenseKey: "387de46d042fdc6eb4b99c8d3574623b821ec414fc27fccd883322a10281c3488dff8d698fd6f6fb",
      previewElement,
      effect: effectList[0],
      rootPath: "./deepar-resources",
      additionalOptions: {
        cameraConfig: {
          facingMode: 'environment'  // uncomment this line to use the rear camera
        },
      },
    });
  } catch (error) {
    console.error(error);
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("permission-denied-screen").style.display = "block";
    return;
  }

  // Hide the loading screen.
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("ar-screen").style.display = "block";

  window.effect = effectList[0];

  const glassesCarousel = new Carousel("carousel");
  glassesCarousel.onChange = async (value) => {
    const loadingSpinner = document.getElementById("loading-spinner");

    if (window.effect !== effectList[value]) {
      loadingSpinner.style.display = "block";
      await deepAR.switchEffect(effectList[value]);
      window.effect = effectList[value];
    }
    loadingSpinner.style.display = "none";
  };
})();
