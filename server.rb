require 'webrick'
require 'json'

root = File.expand_path './public'
server = WEBrick::HTTPServer.new Port: 3000

server.mount_proc '/sieve' do |req, res|

  res['Content-Type'] = 'application/json'
  res['Access-Control-Allow-Origin'] = '*'
  res.body = JSON.generate(JSON.parse(File.read('./sieve.json', encoding: 'UTF-8')))
end

trap('INT') { server.shutdown }

server.start
