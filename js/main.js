$(document).ready(function(){
    $('#btnSave').hide();
     $('#txtnombre').focus();   
   var fila_borrar=-1;
   var MisAlumnos = localStorage.getItem("MisAlumnos");
   MisAlumnos = JSON.parse(MisAlumnos);
   if(MisAlumnos == null){ 
       MisAlumnos = [];
   }else{
       MostrarAlumnos();
   }
   $('#btnAdd').click(function(){
           AddStudents();
   });
   
       $(document).on('click','#btnBorrar',function(){                         
                       fila_borrar = parseInt($(this).attr("alt")); 
                       MisAlumnos.splice(fila_borrar, 1); 
                       localStorage.setItem("MisAlumnos", JSON.stringify(MisAlumnos));
                       alert("Registro de Alumno Eliminado");                                  
                       MostrarAlumnos();               
       });
      
       $(document).on('click','#btnEditar',function(){ 
                   $('#btnAdd').hide();
                   fila_borrar=parseInt($(this).attr('alt'));
                   var studiante = JSON.parse(MisAlumnos[fila_borrar]); 
                   $("#txtcod").val(studiante.codigo);
                   $("#txtnombre").val(studiante.nombre);
                   $("#txtdireccion").val(studiante.direccion);
                   $("#txtzona").val(studiante.zona);
                    $('#btnSave').show();                                               
           
       });
       $('#btnSave').click(function(){
           $('#btnAdd').show();
                           MisAlumnos [fila_borrar]= JSON.stringify({ 
                           codigo : $("#txtcod").val(),
                           nombre : $("#txtnombre").val(),
                           direccion : $("#txtdireccion").val(),
                           zona : $("#txtzona").val(),
                       });
                       localStorage.setItem("MisAlumnos", JSON.stringify(MisAlumnos));
                       alert("Registro de Alumno Actualizado");
                        $('#btnSave').hide(); 
                        $('input').val(''); 
                           $('#txtnombre').focus();                        
                       MostrarAlumnos();
       });

function AddStudents(){
if ($.trim($('#txtcod').val())==''){            
               alert('Ingresa el codigo');
               $('#txtcod').focus();
               return false;
   }

   if ($.trim($('#txtnombre').val())==''){         
       alert('Ingresa el nombre');
       $('#txtnombre').focus();
       return false;
   }

   if ($.trim($('#txtdireccion').val())==''){          
   alert('Ingresa la direccion');
   $('#txtdireccion').focus();
   return false;
   }

   if ($.trim($('#txtzona').val())==''){            
   alert('Ingresa la zona');
   $('#txtzona').focus();
   return false;
   }

   
   
var students = JSON.stringify({       
   codigo : $("#txtcod").val(),
   nombre : $("#txtnombre").val(),
   direccion : $("#txtdireccion").val(),
   zona: $("#txtzona").val(),
});

MisAlumnos.push(students);
localStorage.setItem("MisAlumnos", JSON.stringify(MisAlumnos));
alert("Cliente Registrado con Exito");
$('input').val('');
$('#txtnombre').focus();
MostrarAlumnos();
}

function MostrarAlumnos()   {
$('#tblStudents tr:not(:first)').remove();
       for(var i in MisAlumnos)
       {
           var con = JSON.parse(MisAlumnos[i]);
       $('#tblStudents tr:last').after('<tr><td>'+con.codigo+'</td><td>'+con.nombre+'</td><td>'+con.direccion+'</td><td>'+con.zona+'<button id="btnBorrar" alt="'+i+'" class="btn btn-danger btn-sm">Borrar</button>   <button id="btnEditar" alt="'+ i +'" class="btn btn-info btn-sm">Seleccionar</button>'+'</td></tr>');
       }
}

});
