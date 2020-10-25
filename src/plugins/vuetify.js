import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const customColor = new Vuetify({
  // Custom Color Configuartions
  theme: {
    themes: {
      light: {
        primary: colors.shades.black, // 기본 색상
        secondary: colors.shades.white, // 기본 색상
        accent: colors.lightBlue.lighten3, // 강조 색상
        success: colors.green.lighten2, // 성공 색상
        error: colors.red.lighten2
      }
    }
  }
});

export default customColor;
