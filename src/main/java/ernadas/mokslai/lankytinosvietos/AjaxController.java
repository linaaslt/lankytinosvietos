package ernadas.mokslai.lankytinosvietos;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller    // This means that this class is a Controller
@RequestMapping(path="/ajax") // This means URL's start with /demo (after Application path)
public class AjaxController {

	// @Autowired
	// private LaikytojaiRepository laikytojai_repository; 
	
	@Autowired
	private SalysRepository salys_repository; 
	
	@Autowired
	private MiestaiRepository miestai_repository; 
	
	@GetMapping(path="/lst-salys")
	public @ResponseBody Iterable<Salys> getAllSalys() {
		// This returns a JSON or XML with the users
		return salys_repository.findAll();
	}
	
	@GetMapping(path="/lst-miestai")
	public @ResponseBody Iterable<Miestai> getAllMiestai() {
		// This returns a JSON or XML with the users
		return miestai_repository.findAll();
	}
	
	@GetMapping(path="/salys")
	public @ResponseBody Salys getSalis1(
			
    		@RequestParam(required=true) Integer id
			) {
		// This returns a JSON or XML with the users
		Optional<Salys> op_men = salys_repository.findById( id );
		
		Salys salys1 = new Salys();
		
		if ( op_men.isPresent() ) {
			
			salys1 = op_men.get(); 
		}
		
		System.out.println( salys1.toString() );
		
		return salys1;
	}	
	
	 @RequestMapping("/salys-pakeisti")
	    public @ResponseBody String salisSave(
	    		@RequestParam(required=false) String id	
	    		, @RequestParam(required=false) String pav	
	    		, @RequestParam(required=false) String kodas
	    		// , @RequestParam(required=false) String irasas

	    	) {
		 
		 	String msg = "nieks neatlikta";
		 
		 	// if ( irasas != null ) {
		 		
		 		Salys salis = new Salys (
		 				
		 				FormPrepare.takeId ( id )
		 				, pav
		 				, kodas
		 				
		 		);
		 	
		 		// if ( irasas.equals ( "papildyti" ) ) {
		 			
				 	msg = "bandėm įrašyti";			 			
		 			
		 			if ( salys_repository.save( salis ) != null ) {
		 				
					 	msg = "tipo išsaugojom";
		 			}
		 		// }
	 		
		 	// }
	    	   	
	        return msg;
	    }		
	
	 @RequestMapping("/salys-salinti")		
	    public @ResponseBody String salysSalinti(
	    		@RequestParam(required=false) String id	
	    		, @RequestParam(required=false) String irasas

	    	) {
			 
			 	String msg = "nieks neatlikta";
			 
//			 	if ( ( irasas != null ) &&  irasas.equals ( "trinti" ) ) {
			 		
			 		msg = "ieškomas irašas";
			 		
			 		Optional<Salys> op_salys = salys_repository.findById( FormPrepare.takeId ( id ) );
			 		
			 		if ( ! op_salys.isEmpty() ) {
			 			
				 		msg = "irašas surastas, trinam";
				 		
				 		Salys salis = op_salys.get();
				 		salys_repository.delete( salis );
			 		}	
//			 	} 	   	
		     return msg;
		 }
	 
	 @GetMapping(path="/miestai")
		public @ResponseBody Miestai getMiestas1(
				
	    		@RequestParam(required=true) Integer id
				) {
			// This returns a JSON or XML with the users
			Optional<Miestai> op_men = miestai_repository.findById( id );
			
			Miestai miests1 = new Miestai();
			
			if ( op_men.isPresent() ) {
				
				miests1 = op_men.get(); 
			}
			
			System.out.println( miests1.toString() );
			
			return miests1;
		}	

	 @RequestMapping("/miestai-pakeisti")
	    public @ResponseBody String miestasSave(
	    		@RequestParam(required=false) String id	
	    		, @RequestParam(required=false) String pav	
	    		, @RequestParam(required=false) String platuma
	    		, @RequestParam(required=false) String ilguma
	    		, @RequestParam(required=false) String id_salies
	    		// , @RequestParam(required=false) String irasas

	    	) {
		 
		 	String msg = "nieks neatlikta";
		 
		 	// if ( irasas != null ) {
		 		
		 		Miestai miestas = new Miestai (
		 				
		 				FormPrepare.takeId ( id )
		 				, pav
		 				, FormPrepare.takeId ( platuma )
		 				, FormPrepare.takeId ( ilguma )
		 				, FormPrepare.takeId ( id_salies )
		 				
		 		);
		 	
		 		// if ( irasas.equals ( "papildyti" ) ) {
		 			
				 	msg = "bandėm įrašyti";			 			
		 			
		 			if ( miestai_repository.save( miestas ) != null ) {
		 				
					 	msg = "tipo išsaugojom";
		 			}
		 		// }
	 		
		 	// }
	    	   	
	        return msg;
	    }		
	
	 @RequestMapping("/miestai-salinti")		
	    public @ResponseBody String miestaiSalinti(
	    		@RequestParam(required=false) String id	
	    		, @RequestParam(required=false) String irasas

	    	) {
			 
			 	String msg = "nieks neatlikta";
			 
//			 	if ( ( irasas != null ) &&  irasas.equals ( "trinti" ) ) {
			 		
			 		msg = "ieškomas irašas";
			 		
			 		Optional<Miestai> op_miestai = miestai_repository.findById( FormPrepare.takeId ( id ) );
			 		
			 		if ( ! op_miestai.isEmpty() ) {
			 			
				 		msg = "irašas surastas, trinam";
				 		
				 		Miestai miestas = op_miestai.get();
				 		miestai_repository.delete( miestas );
			 		}	
//			 	} 	   	
		     return msg;
		 } 
}