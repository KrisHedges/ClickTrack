['rubygems', 'sinatra', 'dm-core' , 'dm-validations' ,'dm-migrations','dm-sqlite-adapter', 'haml'].each{|r|require r}

## SET HAML > HTML5
set :haml, :format => :html5

## CONFIGURATION
DataMapper.setup(:default, 'sqlite://db/app.db')

## MODELS
class Chart
  include DataMapper::Resource  
  property :id,           Serial
  property :points,       Text
  property :created_at,   DateTime
end
DataMapper.finalize
DataMapper.auto_upgrade!

##URI's
get '/' do
  @charts = Chart.all :order => [:created_at.desc]
  @chartcount = @charts.size
  haml :index                   
end

get '/charts' do
 @charts = Chart.all :order => [:created_at.desc]
 @chartcount = @charts.size
 haml :list
end

get '/chart/:id' do
  @chart = Chart.get(params[:id])
  haml :show
end

post '/chart/new' do
 chart = Chart.create(:points=>params[:points],:created_at=>Time.now)
 if chart.save
   status 201
 else
   status 412
 end
end

post '/chart/destroy/:id' do
  @chart = Chart.get(params[:id])
  @chart.destroy
  if @chart.destroy
    status 201
  else
    status 412
  end
end
