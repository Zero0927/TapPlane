

'use strict';

module.exports = function (coolie) {

    coolie.config({
       
        clean: true,

      
        dest: {
          
            dirname: '../webroot-pro/',
            
            host: '/games/10002792/',
         
            versionLength: 32
        },

      
        js: {
            
            main: [
              
                'index.js'
            ],
         
            'coolie-config.js': "./coolie-config.js",
         
           
            chunk: [],
          
            minify: {
                global_defs: {
                    DEBUG: false
                }
            }
        },

        
        html: {
            
            src: [
              
                'index.html'
            ],
           
            minify: true
        },

        css: {
            
            dest: './static/css/',
           
            minify: false
        },

   
        resource: {
           
            dest: './static/res/',
            
            minify: true
        },

        
        copy: [
          
            './res/**'

        ]
    });

};