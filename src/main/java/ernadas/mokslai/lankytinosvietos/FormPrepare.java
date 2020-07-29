package ernadas.mokslai.lankytinosvietos;

public class FormPrepare {
	
	public static Integer integerOrNull ( String from ) {
		

		Integer val = null;
		
		if ( ( from != null ) &&  ( ! from.trim().equals( "" ) ) ) {
			
			val = Integer.parseInt( from );
		}
		
		return val;
	}
	
	
	public static Double doubleOrNull ( String from ) {
		

		Double val = null;
		
		if ( ( from != null ) &&  ( ! from.trim().equals( "" ) ) ) {
			
			val = Double.parseDouble( from );
		}
		
		return val;
	}	
	
	public static Integer takeId ( String id ) {
		

		Integer val = null;
		
		if ( ( id != null ) &&  ( ! id.trim().equals( "" ) ) && ( ! id.trim().equals( "0" ) ) ) {
			
			val = Integer.parseInt( id );
		}
		
		return val;
	}
	
	public static Integer takeFlag ( String flag  ) {
		
		Integer val = 0;
		
		if ( ( flag != null ) &&  ( ! flag.trim().equals( "" ) ) ) {
			
			val = Integer.parseInt( flag );
		}
		return val;
	}
	
	public static String DataIsEil ( String datos_eil ) {
		
		// https://www.javatpoint.com/java-get-current-date
 		// DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
	 	//  LocalDateTime now = LocalDateTime.now(); 
		
		return datos_eil;
	}

}
