(function (root) {

    var TodoItem = Backbone.Model.extend({
        defaults: function () {
            return {
                done: false,
                text: 'This is a pending todo'
            };
        }
    });

    var TodoList = Backbone.Collection.extend({
        model: TodoItem
    });

    var TodoView = Backbone.View.extend({

        template: Handlebars.compile($('#todo-template').html()),

        events: {
            'dblclick': 'toggleEditMode',
            'keypress .todo-text-input': 'modifyText',
            'click button': 'toggleEditMode',
            'click .done-box': 'toggleDone'
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            this.display = this.$('.todo-display-text strong');
            this.input = this.$('.todo-text-input');
            this.form = this.$('.edit');

            return this;
        },

        toggleEditMode: function () {
            this.model.set({
                text: this.input.val()
            });

            this.form.toggleClass('hidden');
        },

        modifyText: function (event) {
            this.display.text(this.input.val());
        },

        toggleDone: function () {
            this.model.set({done: !this.model.get('done')})
            this.display.toggleClass('finished');
        }

    });

    var TodoListView = Backbone.View.extend({
        el: '#app',
        render: function () {
            this.$el.empty();

            this.collection.forEach(function (todoItem) {
                var todoView = new TodoView({model: todoItem});
                this.$el.append(todoView.render().el);
            }, this);
        }
    });

    var AboutView = Backbone.View.extend({

        el: '#app',

        render: function () {
            this.$el.html("Copylefts: ElderMael");
            return this;
        }
    });

    var IndexView = Backbone.View.extend({

        template: Handlebars.compile('<a href="#todo">{{salute}}</a>'),

        el: '#app',

        render: function () {
            this.$el.html(this.template({
                salute: 'Hello, World!'
            }));
            return this;
        }
    });


    var AppRouter = Backbone.Router.extend({

        initialize: function () {
            this.indexView = new IndexView();
            this.todoListView = new TodoListView({
                collection: new TodoList([
                    {text: 'Remember the milk', done: false},
                    {text: 'Bring the milk', done: true}
                ])
            });
            this.aboutView = new AboutView();
        },

        start: function () {
            this.indexView.render();
        },

        routes: {
            '': 'index',
            'todo': 'todo',
            'about': 'about'
        },

        index: function () {
            this.indexView.render();
        },

        todo: function () {
            this.todoListView.render();
        },

        about: function () {
            this.aboutView.render();
        }

    });

    var appRouter = new AppRouter();

    root.App = {
        router: appRouter
    }


})(this);

$(document).ready(function () {
    App.router.start();
    Backbone.history.start();
});