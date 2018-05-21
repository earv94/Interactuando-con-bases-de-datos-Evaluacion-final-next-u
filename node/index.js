var express = require('express');
var app = express();
var body_parser = require('body-parser');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/examen');
mongoose.connect('mongodb://carlos:123456@ds217138.mlab.com:17138/examen');
var Schema = mongoose.Schema;

var IDUsuario="";

//usuario
var userSchemaJson={
  email:String,
  password:String
};
var userSchema=new Schema(userSchemaJson);
var UserModelo=mongoose.model("User",userSchema);

var EventoSchemaJson={
  idUser:String,
  title:String,
  start:String,
  start_hour:String,
  end:String,
  end_hour:String
};
var EventoSchema=new Schema(EventoSchemaJson);
var EventoModelo=mongoose.model("Evento",EventoSchema);

app.use(express.static("client"));
app.use(body_parser.urlencoded({extended:true}));

app.listen(3000, function () {
  console.log('Escuchando por el puerto 3000');
  CrearUsuarios("cjcs@dominio.com","123456");
});


function CrearUsuarios(user,pass){
  UserModelo.findOne({email:user}).exec(function(err,docs){
    if(docs==null){
      var usuario=new UserModelo({email:user,password:pass});
      usuario.save();
    }
  });
}

app.post("/login",function(req,res){
  var user=req.body.user || '';
  var pass=req.body.pass || '';
  UserModelo.findOne({email:user}).exec(function(err,docs){
    if(docs!=null){
      if(pass.search(docs.password)!=-1){
        IDUsuario=docs._id;
      res.end("Validado");
      }else{
          res.end("Usuario o contraseña incorrecta");
      }
    }else{
      res.end("Usuario o contraseña incorrecta");
    }
  })
})

app.get("/events/all",function(req,res){
    EventoModelo.find({idUser:IDUsuario}).exec(function(err,Registros){
    var consulta="";
    var Retorno='';
    for(var Llave in Registros){
      var Id="";
      var Title="";
      var Start="";
      var StartHour="";
      var End="";
      var EndHour="";
      if(Registros[Llave]._id !== undefined){
          Id=Registros[Llave]._id;
      }
      if(Registros[Llave].title !== undefined){
          Title=Registros[Llave].title;
      }
      if(Registros[Llave].start !== undefined){
          Start=Registros[Llave].start;
      }
      if(Registros[Llave].start !== undefined && Registros[Llave].start_hour !== undefined){
          Start=Start+"T"+Registros[Llave].start_hour;
      }
      if(Registros[Llave].end !== undefined){
          End=Registros[Llave].end;
      }
      if(Registros[Llave].end !== undefined && Registros[Llave].end_hour !== undefined){
          End=End+"T"+Registros[Llave].end_hour;
      }
      if(consulta==''){
          consulta='[{"id":"'+Id+'","title":"'+Title+'","start":"'+Start+'","end":"'+End+'"}';
      }else{
          consulta=consulta+',{"id":"'+Id+'","title":"'+Title+'","start":"'+Start+'","end":"'+End+'"}';
      }
    }
    if(consulta!=''){
      consulta=consulta+']';
      Retorno=JSON.parse(consulta);
    }
    //console.log(consulta);
    res.end(consulta);
  });
})

app.post("/events/new",function(req,res){
  var titulo=req.body.title || '';
  var start=(req.body.start).split("T") || '';
  var startDate=start[0];
  var startHour=start[1];
  var end=(req.body.end).split("T") || '';
  var endDate=end[0];
  var endHour=end[1];
  var evento=new EventoModelo({
    idUser:IDUsuario,
    title:titulo,
    start:startDate,
    start_hour:startHour,
    end:endDate,
    end_hour:endHour});
    evento.save();
    res.send(evento._id);
  console.log("id evento: "+evento._id);
})

app.post("/events/delete",function(req,res){
    var id=req.body.id || '';
    EventoModelo.remove({_id: id}, function(error){
      if(error){
         res.send('Error al intentar eliminar el personaje.');
      }else{
         res.send('Evento eliminado correctamente');
      }
    })
})

app.post("/events/update",function(req,res){
    var id=req.body.id || '';
    var start=(req.body.start).split("T") || '';
    var end=(req.body.end).split("T") || '';
    EventoModelo.findOne({_id: id}).exec(function(err,docs){
        if(docs!=null){
          var evento=docs;
          evento.start=start[0];
          if(start[1]!==undefined){
            evento.start=start[0];
          }
          evento.end=end[0];
          if(end[1]!==undefined){
            evento.end=end[1];
          }
          evento.save(function(error, documento){
            if(error){
               res.send('Error al actualizar el evento.');
            }else{
               res.redirect('evento actualizado correctamente');
            }
         });
        }
    })
})
