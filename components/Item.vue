<script lang="ts">

import moment from "moment";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { ClassTodo } from "../class/ClassTodo";

@Component({
  components: {},
})

export default class List extends Vue {

  @Prop({ required: true, type: Object as () => ClassTodo }) todo: ClassTodo;

  render(createElement: any) {
    return createElement("div", [
      createElement(
        "v-card",
        {
          attrs: { elevation: "2", maxWidth: "500px" },
          class: "pa-4 mb-4 mx-auto"
        },
        [
          createElement("v-text-field", {
            attrs: {
              dense: true,
              outlined: true,
              label: "Title",
              value: this.todo?.title,
            },
            on: {
              input: (value: string) => {
                this.todo.title = value;
              },
            },
          }),
          createElement("v-textarea", {
            attrs: {
              dense: true,
              rows: "2",
              outlined: true,
              autoGrow: true,
              label: "Description",
              value: this.todo?.description,
            },
            on: {
              input: (value: string) => {
                this.todo.description = value;
              },
            },
          }),

          createElement("v-row", [
            createElement("v-col", { attrs: { cols: "12", sm: "4" } }, [
              this.deleteBtn(createElement),
            ]),
            createElement("v-col", { attrs: { cols: "12", sm: "8" } }, [
              this.dateItem(createElement),
            ]),
          ]),
        ]
      ),
    ]);
  }

  deleteBtn(createElement: any) {
    return createElement(
      "v-btn",
      {
        attrs: {
          elevation: "2",
          color: "error",
        },
        on: {
          click: () => this.deleteTodo(this.todo),
        },
      },
      [createElement("v-icon", "mdi-delete"), createElement("span", "Delete")]
    );
  }

  dateItem(createElement: any) {
    return createElement("div", { class: "float-right text-caption" }, [
      createElement("span", "Created: "),
      createElement("span", this.todo.date),
    ]);
  }

  @Emit("deleteTodo")
  deleteTodo(todo: ClassTodo) {
    return todo;
  }

  @Watch("todo", { deep: true })
  modify() {
    this.todo.date = moment().format("MMMM Do YYYY, h:mm:ss a");
    localStorage.setItem("todo", JSON.stringify(this.todo));
  }
}
</script>
