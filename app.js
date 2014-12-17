(function (root) {

    var TodoItem = Backbone.Model.extend({
        defaults: function () {
            return {
                done: false,
                text: ''
            };
        }
    });

    var TodoView = Backbone.View.extend({

        template: Handlebars.compile('{{done}} task: {{text}}'),

        el: '#app',

        initialize: function () {
            this.model = new TodoItem();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
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
            this.todoView = new TodoView();
        },

        start: function () {
            this.indexView.render();
            Backbone.history.start();
        },

        routes: {
            '': 'index',
            'todo': 'todo'
        },

        index: function () {
            this.indexView.render();
        },

        todo: function () {
            this.todoView.render();
        }

    });

    var appRouter = new AppRouter();

    root.App = {
        router: appRouter
    }


})(this);

$(document).ready(function () {
    App.router.start();
});