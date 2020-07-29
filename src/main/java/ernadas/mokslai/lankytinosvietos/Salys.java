package ernadas.mokslai.lankytinosvietos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Salys {

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String pav;
	private String kodas;
	
	public Salys (Integer id, String pav, String kodas) {
		super();
		this.id = id;
		this.pav = pav;
		this.kodas = kodas;
	}
	
	 public Salys () {
		 super ();
	 }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPav() {
		return pav;
	}

	public void setPav(String pav) {
		this.pav = pav;
	}

	public String getKodas() {
		return kodas;
	}

	public void setKodas(String kodas) {
		this.kodas = kodas;
	}
	 
	 
}
