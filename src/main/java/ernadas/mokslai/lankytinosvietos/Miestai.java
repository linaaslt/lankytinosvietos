package ernadas.mokslai.lankytinosvietos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Miestai {

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String pav;
	private Double platuma;
	private Double ilguma;
	private Integer id_salies;
	
	public Miestai (Integer id, String pav, Double platuma, Double ilguma, Integer id_salies) {
		super();
		this.id = id;
		this.pav = pav;
		this.platuma = platuma;
		this.ilguma = ilguma;
		this.id_salies = id_salies;
	}
	
	 public Miestai () {
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

	public Double getPlatuma() {
		return platuma;
	}

	public void setPlatuma(Double platuma) {
		this.platuma = platuma;
	}

	public Double getIlguma() {
		return ilguma;
	}

	public void setIlguma(Double ilguma) {
		this.ilguma = ilguma;
	}

	public Integer getId_salies() {
		return id_salies;
	}

	public void setId_salies(Integer id_salies) {
		this.id_salies = id_salies;
	}

}
