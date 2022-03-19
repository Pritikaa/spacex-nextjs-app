import LaunchItem from './LaunchItem';
import classes from './MeetupList.module.css';
import { client } from '../../pages/_app';
import { gql } from '@apollo/client';

function LaunchesList({launches}) {
  console.log("launches", launches)
  return (
    <ul className={classes.list}>
      {launches.map((launch) => (
        <LaunchItem
          key={launch.id}
          id={launch.id}
          image={launch.links.mission_patch}
          title={launch.mission_name}
          address={launch.launch_site.site_name_long}
        />
      ))}
    </ul>

    
  //   <main className={styles.main}>
  //   <h1 className={styles.title}>SpaceX Launches</h1>

  //   <p className={styles.description}>Latest launches from SpaceX</p>

  //   <div className={styles.grid}>
  //     {launches.map((launch) => {
  //       return (
  //         <a
  //           key={launch.id}
  //           href={launch.links.video_link}
  //           className={styles.card}
  //         >
  //           <h2>{launch.mission_name}</h2>
  //           <p>
  //             <strong>Launch Time : </strong>
  //             {new Date(launch.launch_date_local).toLocaleDateString("en-US")}
  //           </p>
  //           <p>
  //             <strong>Launch Site: </strong>
  //             {launch.launch_site.site_name_launch}
  //           </p>
  //           <p>
  //             <strong>Launch Rocket: </strong>
  //             {launch.rocket.rocket_name}
  //           </p>
  //         </a>
  //       );
  //     })}
  //   </div>
  // </main>
  );
}

export default LaunchesList;


export async function getStaticProps() {

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit:10) {
          id
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          details
          links {
            article_link
            video_link
            mission_patch
            wikipedia
          }
          rocket {
            rocket_name
          }
        }
      }
    `,
  });

  return {
    props: {
      launches: data.launchesPast,
    },
  };
}
