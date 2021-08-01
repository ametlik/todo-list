<script lang="ts">
import moment from "moment";
import { Vue, Component, Watch } from "vue-property-decorator";
import { ClassTodo } from "../class/ClassTodo";
import Item from "./Item.vue";

@Component({
  components: {
    Item,
  },
})
export default class List extends Vue {
  public todo: ClassTodo = new ClassTodo();
  public todoToAdd: ClassTodo = new ClassTodo();
  public alert = false;
  public deleteTodo?: ClassTodo;

  public todos: ClassTodo[] = [
    {
      title: "Test 1",
      description: " Test 11",
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "Test 2",
      description: " Test 22",
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    },
  ];

  created() {
    localStorage.setItem("todos", JSON.stringify(this.todos));

    const todos = localStorage?.getItem("todos");
    if (todos) {
      this.todos = JSON.parse(todos);
    }
  }

  render(createElement: any) {
    return createElement("div", { class: "px-3" }, [
      this.noTodosAlert(createElement),
      createElement(
        "div",
        { attrs: { alignSelf: "center" } },
        this.todos.map((todo) =>
          createElement(Item, {
            props: {
              todo: todo,
            },
            on: {
              deleteTodo: (todoToDelete: ClassTodo) => {
                this.delete(todoToDelete);
              },
            },
          })
        )
      ),
      // ADD BUTTON
      createElement("div", { class: "text-center" }, [
        createElement(
          "v-btn",
          {
            attrs: {
              color: "success",
            },
            class: "mb-5",
            on: {
              click: () => this.addTodo(),
            },
          },
          [createElement("v-icon", "mdi-plus"), createElement("span", "Add")]
        ),
      ]),
    ]);
  }

  delete(todoToDelete: ClassTodo) {
    this.todos = this.todos.filter((todo) => todo !== todoToDelete);
    localStorage.removeItem("todoToDelete");
  }

  addTodo() {
    this.todoToAdd = new ClassTodo();
    this.todos.push(this.todoToAdd);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  noTodosAlert(createElement: any) {
    if (this.todos.length === 0) {
      return createElement(
        "v-alert",
        {
          attrs: {
            dense: true,
            outlined: true,
            type: "error",
            width: "250px",
          },
          class: "mb-4 mx-auto",
        },
        "No todo in the list."
      );
    }
  }

  @Watch("todos", { deep: true })
  modify() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    const todos = localStorage?.getItem("todos");
  }

  @Watch("todos")
  setAlert() {
    if (this.todos.length < 1) {
      this.alert = true;
    } else {
      this.alert = false;
    }
  }
}
</script>
