import React from 'react';
import { 
    BookOutlined, 
    TeamOutlined, 
    BankOutlined, 
    ClockCircleOutlined, 
    AimOutlined, 
    StarOutlined 
} from '@ant-design/icons';
import styles from './StatisticsSection.module.css';

export default function StatisticsSection() {
    return (
        <section className={styles.container}>
            <div className={styles.section}>
                <h1 className={styles.title}>Nossos Expectativa</h1>
                <p className={styles.expectation}>Ao longo dos anos, temos essa expectativa de crescimento e impacto positivo.</p>
                <div className={styles.statistics}>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <BookOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>1200+</h1>
                        <p className={styles.description}>Cursos Disponíveis</p>
                        <span className={styles.subdescription}>Conteúdo prático e relevante</span>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <TeamOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>40k+</h1>
                        <p className={styles.description}>Colaboradores Treinados</p>
                        <span className={styles.subdescription}>Desenvolvimento contínuo de pessoas</span>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <BankOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>800+</h1>
                        <p className={styles.description}>Empresas Parceiras</p>
                        <span className={styles.subdescription}>Transformando resultados juntos</span>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <ClockCircleOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>5M+</h1>
                        <p className={styles.description}>Horas de Treinamento</p>
                        <span className={styles.subdescription}>Aprendizado acessível e engajador</span>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <AimOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>97%</h1>
                        <p className={styles.description}>Taxa de Conclusão</p>
                        <span className={styles.subdescription}>Engajamento e autonomia</span>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <StarOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>4.9/5</h1>
                        <p className={styles.description}>Avaliação Média</p>
                        <span className={styles.subdescription}>Excelência reconhecida</span>
                    </div>
                </div>
            </div>
        </section>
    );
};