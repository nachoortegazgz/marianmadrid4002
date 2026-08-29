import { initMarianAdministration } from "public/marianAdministrationController";
const WIDGET_ID = "#htmlAdministracion";
$w.onReady(async function () {
    await initMarianAdministration($w(WIDGET_ID), "administracion-marian");
});
