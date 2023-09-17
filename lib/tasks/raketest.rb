namespace :raketest do
  namespace :javascript do
    desc "Compiles each js file"
    task validate: :environment do
      JS_PATH = "app/assets/javascripts/**/*.js"
      Dir[JS_PATH].each do |file_name|
        ap "=================================================="
        ap file_name
        puts ""
        puts Terser.compile(File.read(file_name))
        ap "=================================================="
        puts "\n\n\n"
      end
    end
  end
end
