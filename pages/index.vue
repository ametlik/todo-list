<script lang="ts">

import List from "../components/List.vue";
import { VNode } from "vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    List
  },
})

export default class index extends Vue {
  render(createElement: any): VNode {
    return createElement("v-app", [
      this.header(createElement, "v-card"),
      this.main(createElement),
      this.footer(createElement, "v-footer"),
    ]);
  }

  header(createElement: any, component: string): VNode {
    return createElement(component, { attrs: { color:"grey lighten-4 mb-3", flat: true, tile: true }}, [
      createElement('v-toolbar', { attrs: { dense: true, src: "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg", height:"100px" }}, [
        createElement('v-toolbar-title', {class: 'white--text'}, 'SPA - Todo List')
      ])
    ])
  }

  main(createElement: any): VNode {
    return createElement("v-main", {}, [
      createElement("v-container", [createElement(List)]),
    ]);
  }

  footer(createElement: any, component: string): VNode {
    return createElement(component, { attrs: { color: "blue darken-4" } }, [
      createElement("v-col", { class: "text-center" }, [
        createElement(
          "span",
          { class: "white--text" },
          new Date().getFullYear()
        ),
        createElement("span", { class: "white--text" }, " - Vuetify"),
      ]),
    ]);
  }
}
</script>