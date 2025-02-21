import { Resume } from '../../resume/resume';
import { MdDiv } from '../components/md';
import SkillRate from '../components/skillRates/circle';
import styles from './index.module.css';

export default function Turquoise({ resume }: { resume: Resume }) {
  const { name, title, profilePicture, infos, skills, experiences, educations, projects, interests, introduction } = resume;
  return <div className={styles.root}>
    <div className={styles.header}>
      <div className={styles.headerMain}>
        {
          profilePicture && <div className={styles.profilePicture}>
            <img src={profilePicture} alt="profile" />
          </div>
        }
        <div className={styles.basic}>
          <div className={styles.name}>{name}</div>
          <div className={styles.title}>「{title}」</div>
          <div className={styles.infos}>
            {infos.map(info => <div key={info.id} className={styles.infoItem}><div className={styles.infoLabel}>{info.label}</div> : <div className={styles.infoValue}>{info.value}</div></div>)}
          </div>
          {
            interests.length > 0 &&
              <div className={styles.interests}>兴趣 ：{interests.map(interest => <span key={interest}>{interest} </span>)}</div>
          }
        </div>
      </div>
    </div>
    <div className={styles.main}>
      <div className={styles.sider}>
        <div className={styles.siderContent}>
          {
            introduction && <div className={styles.introduction}>
              <h2>个人简介</h2>
              <div className={styles.introductionBlock}>
                <MdDiv text={introduction} />
              </div>
            </div>
          }
          {
            skills.length > 0 &&   
            <div>
              <div>
                <h2>技能</h2>
                <div className={styles.skills}>
                  {skills?.map(skill => <div key={skill.id} className={styles.skillItem}><div>{skill.name}</div>{skill.level > 0 && <SkillRate rate={skill.level} />}</div>)}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div className={styles.mainPart}>
        {
          experiences.length > 0 &&
          <div className={styles.block}>
            <h2 className={styles.experienceHead}>工作经历</h2>
            <div className={styles.mainBlock}>
              {
                experiences.map(experience => (
                  <div key={experience.id}>
                    <div className={styles.blockHeader}>
                      <div className={styles.blockTitle}>{experience.company}</div>
                      <div className={styles.dates}>{experience.startDate} - {experience.endDate || '至今'}</div>
                      <div>{experience.title}</div>
                    </div>
                    <MdDiv text={experience.description} />
                  </div>
                ))
              }
            </div>
          </div>
        }
        {
          educations.length > 0 &&
          <div className={styles.block}>
            <h2>教育经历</h2>
            <div className={styles.mainBlock}>
              {educations.map(education => (
                <div key={education.id}>
                  <div className={styles.blockHeader}>
                    <div className={styles.blockTitle}>{education.school}</div>
                    <div className={styles.dates}>{education.startDate} - {education.endDate || '至今'}</div>
                    <div>{education.major}</div>
                    <div>{education.degree}</div>
                  </div>
                  <MdDiv text={education.description} />
                </div>
              ))}
            </div>
          </div>
        }
        {
          projects.length > 0 &&
          <div className={styles.block}>
            <h2>项目经历</h2>
            <div className={styles.mainBlock}>
              {projects.map(project => (
                <div key={project.id}>
                  <div className={styles.blockHeader}>
                    <div className={styles.blockTitle}>{project.name}</div>
                    <div className={styles.dates}>{project.startDate} - {project.endDate || '至今'}</div>
                    { project.title && <div>{project.title}</div> }
                  </div>
                  { project.excerpt && <MdDiv text={project.excerpt} /> }
                  <MdDiv text={project.description} />
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  </div>
}