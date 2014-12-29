requirejs.config({
    paths: {
      'jquery': 'bower_components/jquery/dist/jquery',
      'handlebars': 'bower_components/handlebars/handlebars.amd',
      'underscore': 'bower_components/underscore/underscore',
      'backbone': 'bower_components//backbone/backbone',
      'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
      'core': 'core'
    },

    shim: {
        'bootstrap': {
            deps: ['jquery']
        },

        'backbone': {            
            deps: ['underscore', 'jquery', 'handlebars'],
            exports: 'Backbone'
        },

        'underscore': {
            exports: '_'
        }        
    }
});

require(['core'], function(Core){

    var TodoItem = Core.Backbone.Model.extend({
        defaults: function () {
            return {
                done: false,
                text: 'This is a pending todo'
            };
        }
    });

    var TodoList = Core.Backbone.Collection.extend({
        model: TodoItem
    });

    var TodoView = Core.Backbone.View.extend({

        template: Core.Handlebars.compile($('#todo-template').html()),

        tagName: 'li',
        className: 'post-it',

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

    var TodoListView = Core.Backbone.View.extend({
        el: '#app',
        
        render: function () {
            this.$el.html('<ul class="post-it-list"></ul>');

            this.collection.forEach(function (todoItem) {
                var todoView = new TodoView({model: todoItem});
                this.$('ul').append(todoView.render().el);
            }, this);
        }
    });

    var AboutView = Core.Backbone.View.extend({

        el: '#app',

        render: function () {
            this.$el.html("Copylefts: ElderMael");
            return this;
        }
    });

    var IndexView = Core.Backbone.View.extend({

        template: Core.Handlebars.compile('<a href="#todo">{{salute}}</a>'),

        el: '#app',

        render: function () {
            this.$el.html(this.template({
                salute: 'Hello, World!'
            }));
            return this;
        }
    });

    var AppRouter = Core.Backbone.Router.extend({

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


    $(document).ready(function () {
        appRouter.start();
        Backbone.history.start();
    });

});


