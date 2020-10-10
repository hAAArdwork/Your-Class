import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const customColor = new Vuetify({
  // Custom Color Configuartions
  theme: {
    themes: {
      light: {
        primary: colors.orange.lighten1,
        secondary: colors.orange.lighten3,
        accent: colors.orange.darken1
      }
    }
  }
});

export default customColor;
