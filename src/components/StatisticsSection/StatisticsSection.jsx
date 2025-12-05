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
                <h1 className={styles.title}>Nossos Números Falam Por Si</h1>
                <div className={styles.statistics}>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <BookOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>850+</h1>
                        <p className={styles.description}>Cursos Disponíveis</p>
                        <span className={styles.subdescription}>Em todas as áreas</span>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <TeamOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>25k+</h1>
                        <p className={styles.description}>Colaboradores Treinados</p>
                        <span className={styles.subdescription}>Mensalmente</span>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <BankOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>500+</h1>
                        <p className={styles.description}>Empresas Parceiras</p>
                        <span className={styles.subdescription}>Confiam em nós</span>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <ClockCircleOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>2.5M+</h1>
                        <p className={styles.description}>Horas de Treinamento</p>
                        <span className={styles.subdescription}>Completadas com sucesso</span>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <AimOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>92%</h1>
                        <p className={styles.description}>Taxa de Conclusão</p>
                        <span className={styles.subdescription}>Média dos cursos</span>
                    </div>
                    <div className={styles.statistic}>
                        <div className={styles.icons}>
                            <StarOutlined className={styles.icon} />
                        </div>
                        <h1 className={styles.number}>4.8/5</h1>
                        <p className={styles.description}>Avaliação Média</p>
                        <span className={styles.subdescription}>Dos usuários</span>
                    </div>
                </div>
            </div>
        </section>
    );
};