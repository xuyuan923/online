module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            // 编译
            compile: {
                files: {
                    'assets/css/layout.css': 'assets/css/layout.less'
                }
            },
            // 压缩
            yuicompress: {
                files: {
                    'assets/css/layout-min.css': 'assets/css/layout.css'
                },
                options: {
                    yuicompress: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/css/*.less'],
                tasks: ['less']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['less', 'watch']);
};