(function (root) {

    var TodoItem = Backbone.Model.extend({
        defaults: function () {
            return {
                done: false,
                text: 'This is a pending todo'
            };
        }
    });

    var TodoView = Backbone.View.extend({

        template: Handlebars.compile($('#todo-template').html()),

        el: '#app',        

        initialize: function () {
            this.model = new TodoItem();
        },

        events: {
            'dblclick li': 'toggleEditMode',
            'keypress .todo-text-input': 'modifyText',
            'click button': 'toggleEditMode'
        },
        
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            this.display = this.$('.todo-display-text');
            this.input = this.$('.todo-text-input');
            this.form = this.$('.edit');

            return this;
        },

        toggleEditMode: function (){
            this.model.set({
                text: this.input.val()
            });

            this.form.toggleClass('hidden');
        },

        modifyText: function(event) {
          this.display.html(this.input.val().replace(/\n/g, '<br />'));
        }

    });

    var AboutView = Backbone.View.extend({

        el: '#app',

        render: function(){
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
            this.todoView = new TodoView();
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
            this.todoView.render();
        },

        about: function(){
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