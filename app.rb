['rubygems', 'sinatra', 'dm-core' , 'dm-validations' , 'haml'].each{|r|require r}

## CONFIGURATION
configure :development do
  DataMapper.setup(:default, {
    :adapter  => 'sqlite3',
    :host     => 'localhost',
    :username => '' ,
    :password => '',
    :database => 'db/app.db'})  
end

## SET HAML > HTML5
set :haml, :format => :html5

## MODELS
class Chart
  include DataMapper::Resource
  property :id,         Serial
  property :points,     Text
  property :created_at, DateTime

  validates_presence_of :points
end

##URI's

get '/' do
  haml :index                   
end

post '/' do
  chart = Chart.create(:points=>params[:points],:created_at=>Time.now)
  redirect '/'
end
