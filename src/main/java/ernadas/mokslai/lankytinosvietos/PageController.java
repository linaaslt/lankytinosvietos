package ernadas.mokslai.lankytinosvietos;

import javax.persistence.EntityManagerFactory;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PageController {

	@Autowired
	private SalysRepository salys_repository;
	
	
	@Autowired 
	EntityManagerFactory factory;
	
	public SessionFactory sessionFactory() {

		
        if (factory.unwrap(SessionFactory.class) == null) {
            throw new NullPointerException("factory is not a hibernate factory");
        }
        return factory.unwrap(SessionFactory.class);
	}
	
	@RequestMapping("/salys")
    public String salys(
//    		@RequestParam(required=false) String id	    		
//    		, @RequestParam(required=false) String pav
//    		, @RequestParam(required=false) String kodas
    		Model model 
    	) {
	 
    	
    //    model.addAttribute("lst_menu", Menu.values() );    	
        return "salys";
    }
	
}