package ml.market.cors.domain.article.entity;

import javax.persistence.*;

@Entity
@Table(name = "image_info")
public class image_infoDAO {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "index_id")
    private Long index_id;

    private String image1;
    private String image2;
    private String image3;

    @Enumerated(EnumType.STRING)
    private DivisionEnum image_division;
}
