import { Component, OnInit } from '@angular/core';
import {ARPExtService} from '../arp-ext.service';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import {KYCService} from '../kyc.service';
@Component({
  selector: 'app-anr',
  templateUrl: './anr.component.html',
  styleUrls: ['./anr.component.scss']
})
export class AnrComponent implements OnInit {

imgdata:string="data:image/png;base64,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";
  pageHeight:any;
  pageWidth :any;
  err1:boolean=false;
  err2:boolean=false;
  err3:boolean=false;
  numerocheque:string;
  IdSdetails:string="";
  IdSdetails1:string="";
  Ribtireur1:String="";
  bc_id_TR:String="";
  ribporteur1:string="";
  bc_id:string="";
  Code_Bnk:string="";
  montantcheque:string="";
  FEESHN:string="";
  CODE_AGN_T:string="";
  CODE_AGN_P:string="";
  Numero_CNP:string="";
  Agence_Titre:string="";
  Agence_Titre_1:string="";
  Poste_code:string="";
  Name:string="";
  show:boolean= false;
  showSpin:boolean= false;
  showAlert:boolean= false;
  nmbrenrgcmplt:number;
  tt:number=1;
i:number=0;
point:string=".";
newdate:string;
nom1:string;
nom2:string;
type1:string;
type2:string;
numidvisa1:string;
numidvisa2:string;
DATEARP:string="";
DATECNP:string="";
INTRETARD:string="";
MONTANTPROVISION:string="";
regex:any= /^(\d{4})(\d{2})(\d{2})$/;
teststring:string;
som1:number;
som2:number;
MNT_VERSE:number;
MONTANTCHEQUE_V:string;
MONTANTPROVISION_v:string;
teststring2:string;
MONTANTPROVISION_R:number;
MONTANTCHEQUE_R:number;
MNT_VERSE_String:string;
MillimeMTNcheque:string;
pos:number;
lenght:number;
selected:string="";
DATECNP_RTND:string="";
REGULARISATNDATE:string="";
err:string="";
show2:boolean= false;  
DATERETURN:string=""
tab=[];
  Names=[];
  Names1=[];
  data1;
  data2;
  ACCOUNTHN:string="";
  idcount:string="";
  idcount1:string="";

  nomHN:string;
  prenomHN:string;
  dateanr:string;
  NUMPROT:string;
  dateprot:string;
  NEXTREVIEWDATE:string;
  REJECTED:string;
  myDate:Date;
  nomprenom:string;
  constructor(private arpext : ARPExtService,  private router: Router,private arpext1 : KYCService) { }

  ngOnInit(): void {
    this.show2=true;
  }
  ExtractANR(): void
  {
    this.showSpin=true;

    
    /* *************************ChequeReturned**************************** */
      this.arpext.ExtractChequeReturned(this.numerocheque).subscribe(
        dataCHQ=>
            {
            
            this.data1=dataCHQ;
        
            this.data1=(JSON.stringify(dataCHQ));
            var succes = this.data1.indexOf("SUCCESS");
            var notfound = this.data1.indexOf("No records");
      console.log(this.data1);
            if (succes != -1 && notfound  == -1) {
               this.FEESHN=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].feeshn;
               this.dateanr=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].dateanr;

               this.DATEARP=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].datearp;
               this.INTRETARD=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].intretard;
               this.DATECNP_RTND=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].rejectiondate;
               this.REGULARISATNDATE=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].regularisatndate;
               this.DATERETURN=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].returndate;
               this.idcount=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].accounthn;
               this.idcount1=this.idcount.substr(0,1);
               this.idcount=this.idcount.substr(10,6);
               this.NUMPROT=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].numberprotet;
               this.dateprot=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].dateprotet;
               this.NEXTREVIEWDATE=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].nextreviewdate;
               this.REJECTED=dataCHQ.value.chequesrtndtype[0].gchequesrtnddetailType.mchequesrtnddetailType[0].rejected;
               this.myDate = new Date();
               console.log(this.myDate)

               if (this.idcount1 == "0") {
                 this.idcount=this.idcount.substr(1,5);
                 this.ACCOUNTHN=this.idcount;
                 console.log(this.ACCOUNTHN);
               }
            
                 
             
               
             
               if (this.INTRETARD != "") {
                this.INTRETARD= this.INTRETARD.concat(' DT');
               }

               this.NEXTREVIEWDATE = this.NEXTREVIEWDATE.replace(this.regex, "$3.$2.$1")
               this.NEXTREVIEWDATE= this.NEXTREVIEWDATE.replace('.','/')
               this.NEXTREVIEWDATE= this.NEXTREVIEWDATE.replace('.','/')

               this.DATEARP = this.DATEARP.replace(this.regex, "$3.$2.$1")
               this.DATEARP= this.DATEARP.replace('.','/')
               this.DATEARP= this.DATEARP.replace('.','/')
              
               this.DATERETURN = this.DATERETURN.replace(this.regex, "$3.$2.$1")
               this.DATERETURN= this.DATERETURN.replace('.','/')
               this.DATERETURN= this.DATERETURN.replace('.','/')

               this.DATECNP_RTND = this.DATECNP_RTND.replace(this.regex, "$3.$2.$1")
               this.DATECNP_RTND= this.DATECNP_RTND.replace('.','/')
               this.DATECNP_RTND= this.DATECNP_RTND.replace('.','/')

               this.dateanr = this.dateanr.replace(this.regex, "$3.$2.$1")
               this.dateanr= this.dateanr.replace('.','/')
               this.dateanr= this.dateanr.replace('.','/')

               this.dateprot = this.dateprot.replace(this.regex, "$3.$2.$1")
               this.dateprot= this.dateprot.replace('.','/')
               this.dateprot= this.dateprot.replace('.','/')

               
               if(this.REJECTED !="")
               {
                 this.err1=true;
                 console.log(this.err1);
               }
               else
               {
                this.showSpin=false;
          
                this.err="Ce chèque n'est pas encore rejeter";
                this.showAlert=true;
                this.show2=!this.show2;
                setTimeout(() => {  
                location.reload();
              }, 3000); 
            }

               
            if (this.dateprot !="") 
            {
            this.err2=true;
                  console.log(this.err2);
                }else
                {    
                  this.showSpin=false;

                  this.err=" Absence Date Protet Chèque encore CNP";
                  this.showAlert=true;
                  this.show2=!this.show2;
                  setTimeout(() => {  
                    location.reload();
                  }, 2000); 
              }
                
             if (this.DATEARP=="") 
              {
              this.err3=true;
                    console.log(this.err2);
                  }
                  else
{
  this.showSpin=false;

  this.err="Date ARP existe";
  this.showAlert=true;
  this.show2=!this.show2;
  setTimeout(() => {  
    location.reload();
  }, 2000); 
}
                
          }/*if (notfound  != -1)*/
          else {
            this.showSpin=false;

  this.err="Verifier le numero de cheque  "+this.numerocheque;
  this.showAlert=true;
  this.show2=!this.show2;
  setTimeout(() => {  
    location.reload();
  }, 2000); 
          }

          });



    /* *************************sdetails**************************** */
    this.arpext.Extractsdetails(this.numerocheque).subscribe(
      datasde=>
          {
           this.data1=datasde;
           this.data1=(JSON.stringify(datasde));
           var succes = this.data1.indexOf("SUCCESS");     
           if (succes != -1) {     
               this.IdSdetails=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].id;
               this.Ribtireur1=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribtireur;
               this.ribporteur1=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribporteur;
               this.Code_Bnk=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].ribporteur;
               this.DATECNP=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].datecnp;
               this.DATECNP = this.DATECNP.replace(this.regex, "$3.$2.$1")
               this.DATECNP= this.DATECNP.replace('.','/')
               this.DATECNP= this.DATECNP.replace('.','/')
               this.bc_id_TR=this.Ribtireur1.substr(0,5);
               this.bc_id=this.ribporteur1.substr(0,5);
               this.Code_Bnk=this.ribporteur1.substr(0,2);
               this.CODE_AGN_T=this.Ribtireur1.substr(2,3);
               this.CODE_AGN_P=this.ribporteur1.substr(2,3);
               this.Numero_CNP=this.numerocheque.substr(3,4);
               this.montantcheque=this.montantcheque.concat(" DT");
               this.nmbrenrgcmplt=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].nmbrenrgcmplt;
               this.MONTANTPROVISION=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].montantprovision;
               this.montantcheque=datasde.value.sdetailstype[0].gsdetailsdetailType.msdetailsdetailType[0].montantcheque;
           this.som1= Number(this.montantcheque);
           this.teststring= this.som1.toFixed();
           this.MONTANTCHEQUE_R= Number(this.teststring);
               if(this.MONTANTPROVISION != "")
               {
                this.som2=Number(this.MONTANTPROVISION)
                this.teststring2= this.som2.toFixed();
                this.MONTANTPROVISION_R= Number(this.teststring2);
               }
               else
               {
              this.MONTANTPROVISION_R=0;
               }
               this.MNT_VERSE=this.MONTANTCHEQUE_R-this.MONTANTPROVISION_R;    
         }
        });
        setTimeout(() => { 
       while (this.nmbrenrgcmplt >= 1) { 
         
        this.IdSdetails1=this.IdSdetails;
this.IdSdetails1=this.IdSdetails1.concat(".");
this.IdSdetails1=this.IdSdetails1.concat(this.nmbrenrgcmplt.toString());
         this.arpext.ExtractCompDetails(this.IdSdetails1).subscribe(
          dataComp=>
              {
              this.data1=dataComp;
              this.data1=(JSON.stringify(dataComp));
                this.nom2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].nomprenom;
                this.type2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].type;
                this.numidvisa2=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].numidvisa;
                this.Names.push(
                  {
                    type: this.type2.toString(),
                    name :this.nom2.toString(),
                    numidvisa:this.numidvisa2.toString()
                  }
                )
            }
            );
       this.nmbrenrgcmplt--;
     } 
    }, 12000);  


    setTimeout(() => { 
     
        
       this.IdSdetails1=this.IdSdetails;
this.IdSdetails1=this.IdSdetails1.concat(".").concat("1");

        this.arpext.ExtractCompDetails(this.IdSdetails1).subscribe(
         dataComp=>
             {
             this.data1=dataComp;
             this.data1=(JSON.stringify(dataComp));
               this.nomprenom=  dataComp.value.scompdetailstype[0].gscompdetailsdetailType.mscompdetailsdetailType[0].nomprenom;
         console.log(  this.nomprenom);
             
           }
           );
    } 
   , 12000);





    setTimeout(() => { 
    this.arpext.ExtractBcsortcode(this.bc_id).subscribe(
      dataBanque=>
          {    
            var succes = this.data1.indexOf("SUCCESS");     
            if (succes != -1) {     
          this.data1=dataBanque;
          this.data1=(JSON.stringify(dataBanque));
          this.Agence_Titre=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name;  
          this.Poste_code=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].postcode; 
          this.Name=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name; 
        }}
        );

}, 10000);
setTimeout(() => { 
this.arpext.ExtractBcsortcode(this.bc_id_TR).subscribe(
  dataBanque=>
      {
        var succes = this.data1.indexOf("SUCCESS");     
        if (succes != -1) { 
      this.data1=dataBanque;
      this.data1=(JSON.stringify(dataBanque));
      this.Agence_Titre_1=dataBanque.value.bcsortcodetype[0].gbcsortcodedetailType.mbcsortcodedetailType[0].name;    
    }}
    );
}, 10000);
setTimeout(() => { 
this.arpext.ExtractDigitToString(this.MNT_VERSE).subscribe(
  datadigit=>
      {
      this.data1=datadigit;
      this.data1=(JSON.stringify(datadigit));
      var succes = this.data1.indexOf("SUCCESS");
      if (succes != -1) {
        this.MNT_VERSE_String=datadigit.value.digittostringtype[0].gdigittostringdetailType.mdigittostringdetailType[0].converted;
        this.pos=Number (this.montantcheque.indexOf("."));
        this.pos++;
        this.lenght=Number (this.montantcheque.length);
        this.MillimeMTNcheque=this.montantcheque.substr(this.pos,this.lenght);
        this.MNT_VERSE_String=this.MNT_VERSE_String.concat(" ",this.MillimeMTNcheque," Millimes (",this.montantcheque," DT).");
        this.MNT_VERSE_String=this.MNT_VERSE_String.replace("SEULEMENT","DINARS");
     
    }
    });
  }, 10000);
setTimeout(() => {   
  this.tab.push(
  {
    champ:"N° Du Chèque",
    name: this.numerocheque.toString()
  },
  
  {
    champ:"Montant du Chèque",
    name: this.montantcheque.concat(" DT").toString()
  },
  
{
  champ:"Banque tiré",
  name:"ALBARAKA BANK TUNISIA"
},
  {
    champ:"Agence tiré",
    name: this.Agence_Titre_1.toString()
  },
  {
    champ:"Banque présentatrice",
    name: this.Poste_code.toString()
  },
  {
    champ:"Agence présentatrice",
    name: this.Name.toString()
  },

  )
  this.showSpin=false;
  this.show=!this.show;
  this.show2=!this.show2;
}, 13000);   

setTimeout(() => { 
  this.arpext1.ExtractCustomer(this.ACCOUNTHN).subscribe(
    dataCus=>
        {
          var succes = this.data1.indexOf("SUCCESS");     
          if (succes != -1) { 
        this.data1=dataCus;
        console.log(dataCus);
        this.data1=(JSON.stringify(dataCus));
this.nomHN=dataCus.value.twskycpptype[0].gtwskycppdetailType.mtwskycppdetailType[0].nom;
this.prenomHN=dataCus.value.twskycpptype[0].gtwskycppdetailType.mtwskycppdetailType[0].prenom;

      }}
      );
  }, 10000);

}


selectChangeHandler(event: any)
  {

   this.selected = event.target.value;
 

  }

  back():void
{
  this.router.navigate(['CHEQUERETURNED']);
}
Print() :void
{



  const doc = new jsPDF();

  this.pageWidth =doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
  this.pageHeight =doc.internal.pageSize.height || doc.internal.pageSize.getHeight();

  doc.addImage(this.imgdata, 'PNG', 170, 15, 25, 10);
  doc.addFont
  doc.setFontSize(14);
  doc.text("ANNEXE N°6 A LA CIRCULAIRE AUX ETABLISSEMENTS DE CREDIT N°2007-18",  this.pageWidth / 2, 38 , 'center');
  
  doc.text("DU 05 JUILLET 2007",  this.pageWidth / 2, 50 , 'center');
  doc.text("ATTESTATION DE NON REGULARISATION (ANR)",  this.pageWidth / 2, 62 , 'center');
  
  
  doc.setFontSize(8);
  doc.text("TUNIS,LE",  163, 68 , 'center');
  doc.text(this.dateanr,  179, 68 , 'center');

  doc.setFontSize(10);
  doc.text("32",  24, 80 , 'center');
  doc.text(this.CODE_AGN_T,  23, 86 , 'center');
  doc.text(this.Code_Bnk,  24, 92 , 'center');
  doc.text(this.CODE_AGN_P,  23, 98 , 'center');
  doc.text("N° du chèque :",  23, 104 , 'center');


  doc.text("ALBARAKA BANK TUNISIA",  93, 80 , 'center');
  doc.text(this.Agence_Titre_1,  94, 86 , 'center');
  doc.text(this.Poste_code,  96, 92 , 'center');
  doc.text(this.Name,  101, 98 , 'center');


  doc.text(this.numerocheque,  45, 104 , 'center');
  doc.text("Banque tiré",  42, 80 , 'center');
  doc.text("Agence tiré",  42, 86 , 'center');
  doc.text("Banque présentatrice",  50, 92 , 'center');
  doc.text("Agence présentatrice",  50, 98 , 'center');

  for (let i = 0; i < 2; i++) {
    var num = this.Names[i].name;
if (num == this.selected)
{
 
  doc.text(this.Names[i].type,  30, 110 , 'center');
     doc.text(this.Names[i].numidvisa,  60, 110 , 'center');

}
    
    
  }

  doc.text(" (*)",  42, 110 , 'center');
  doc.text(" Signataire :",  80, 110 , 'center');
  doc.text(this.selected,  120, 110 , 'center');



  doc.text("Nous soussignés, …...……………..….. AL BARAKA BANK TUNISIA, …….....………………..Attestons que le",15,120);
  doc.text("solde du compte : RIB :",15,126); doc.text(this.Ribtireur1,56,126);
  doc.text("Ouvert sur nos livres au nom",140,126);
  doc.text("de :",15,132); doc.text(this.nomprenom,40,132); 
  
  doc.text("N’a pas permis de régler le chèque susvisé",120,132);

  doc.text("d'un montant de",15,138); doc.text(this.MNT_VERSE_String,70,138);
  doc.setFontSize(10);
  doc.text("du",15,144);doc.text(this.DATERETURN,25,144); 
  doc.text(" et du certificat de non-paiement n° ",60,144);doc.text(this.Numero_CNP,120,144);doc.text(this.DATECNP_RTND,150,144); 
  doc.text("Du ",140,144);
  doc.text("ainsi que ",170,144);
  doc.text("l’avis de non-paiement signifié par maitre",15,150);doc.text(this.nomHN,110,150);doc.text(this.prenomHN,150,150)
  doc.text("huissier notaire",15,156);
  doc.text("Par exploit n°",20,162); doc.text(this.NUMPROT,56,162);
  doc.text("du :",120,162); doc.text(this.dateprot,140,162);
  doc.text("(**) ",170,162);
  doc.text("Par lettre recommandée n°",20,168);
  doc.text("du :",120,168);
  doc.text("(**) ",170,168);
  doc.text("Ce chèque n’a pas été régularisé au dernier jour ouvrable du délai légal de régularisation soit",15,174);
  doc.text("le",15,180); doc.text(this.NEXTREVIEWDATE,25,180);

  
  doc.setFontSize(14);

  doc.text("CACHET ET SIGNATURE AUTORISEE",150, 200 , 'center');
  doc.setFontSize(9);
  doc.text("Avec indication des nom et prénom du signataire (***) ",145, 206 , 'center');
  doc.text("(*)Mettre «C» pour la carte d’identité Nationale,",15,260);
  doc.text("«S» pour la carte de séjour pour les étrangers résidents.",25,264);
  doc.text("«P» pour le passeport pour les étrangers non-résidents.",25,268);
  doc.text("(**)Cette date doit correspondre à celle du C.N.P",15,272);


  doc.text("(***)Cette date doit correspondre à la date de reconstitution de la provision",15,276);
  doc.text("(****) Le spécimen de la signature de l’agent doit être déposé auprès de la Banque Centrale.",15,280);


  //Par lettre recommandée n°       	du                                                                                                         	    (**)
  
   
  
 

                                      
 
  

  
  
 


  
  window.open(doc.output('bloburl'), '_blank');
}




  Clear():void
  {
        location.reload();
  }
  
  
}
