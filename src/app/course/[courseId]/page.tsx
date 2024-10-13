"use client";

import baseUrl from "@/configs/Baseurl";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/configs/Context";
import styles from "./CourseDetails.module.css";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import CertificateGen from "@/components/CertificateGen";

export default function Page({ params }: { params: { courseId: number } }) {
  const { id, loggedIn, fullName } = useAuthContext();
  const [course, setCourse] = useState<userCourseType | null>(null);
  const [progress, setProgress] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const handleSubmit = () => {
    fetch(baseUrl + "courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "update_progress",
        data: { userCourseId: course?.user_course_id, progress: progress },
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          response.json().then((res) => {
            console.log(res.error);
            toast.error(res.error);
          });
          return null;
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          toast.success(res.message);
          console.log(res.message);
          setRefresh((prev) => prev + 1);
        }
      })
      .catch((error) => console.log("cav", error));
  };

  useEffect(() => {
    if (!loggedIn) return;
    fetch(baseUrl + "courses?course=" + params.courseId + "&user=" + id)
      .then((response) => {
        if (response.status !== 200) {
          response.json().then((res) => {
            console.log(res.error);
            toast.error(res.error);
          });
          return null;
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          setCourse(res.data);
          setProgress(res.data.progress);
          console.log(res.data);
        }
      })
      .catch((error) => console.log("cav", error));
  }, [refresh]);

  return (
    <>
      {course === null && (
        <center className="mt-4">
          <Spinner />
        </center>
      )}
      {course !== null && (
        <div className={`container ${styles.courseDetails} mb-4`}>
          <div className="row mt-4 border rounded p-3">
            <h1 className={`${styles.title} text-center mb-5`}>
              {course.courses.course_title}
            </h1>
            <div className="col-lg-9">
              <div>
                <iframe
                  width="100%"
                  style={{ aspectRatio: "1.78" }}
                  src="https://www.youtube.com/embed/P5k2Db1SRrY?si=CnjWtCiCdy--WDHB&amp;start=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-muted">
                    <strong>Level:</strong> {course.courses.level}
                  </p>
                  <p className="text-muted">
                    <strong>Subject:</strong> {course.courses.subject}
                  </p>
                  <p className="text-muted">
                    <strong>Duration:</strong> {course.courses.content_duration}{" "}
                    hours
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="text-muted">
                    <strong>Lectures:</strong> {course.courses.num_lectures}
                  </p>
                  <p className="text-muted">
                    <strong>Enrolled At:</strong> {course.enrolled_at}
                  </p>
                  <p className="text-muted">
                    <strong>Status:</strong> {course.status}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="d-flex justify-content-center border rounded p-2">
                <a
                  href="/study_material.pdf"
                  download="study_material.pdf"
                  className=" mt-3 mt-md-0"
                >
                  <Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="currentColor"
                      className="bi bi-download me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                    <span>Download Study Material</span>
                  </Button>
                </a>
              </div>
              <div className=" border rounded p-2 mt-1">
                <label htmlFor="progressRange" className="form-label">
                  Update Course Progress ({progress}%)
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="100"
                  step="1"
                  value={progress}
                  id="progressRange"
                  onChange={handleProgressChange}
                />
                <div className="text-center">
                  <Button className="btn btn-primary" onClick={handleSubmit}>
                    Submit Progress
                  </Button>
                </div>
              </div>
              <div
                className={`${styles.progressSection}  border rounded p-2 mt-1`}
              >
                <h5>Course Progress</h5>
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${course.progress}%` }}
                    aria-valuenow={parseInt(course.progress ?? "0")}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {course.progress}%
                  </div>
                </div>
              </div>
              {course.completed_at && (
                <div
                  className="d-flex justify-content-center border rounded p-2 mt-1"
                  onClick={() =>
                    CertificateGen(fullName, course.courses.course_title)
                  }
                >
                  <a className=" mt-3 mt-md-0">
                    <Button>
                      <svg
                        fill="currentColor"
                        height="28px"
                        width="28px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 64 64"
                        enable-background="new 0 0 64 64"
                        xmlSpace="preserve"
                      >
                        <g id="Certificate-file">
                          <path
                            d="M54.1076508,14.717124c-0.0053024-0.0955-0.0237999-0.1876001-0.0559006-0.2779007
		c-0.0102005-0.0284996-0.0171013-0.0567999-0.0298004-0.0840998c-0.0480995-0.1046-0.1090012-0.2038994-0.1932983-0.2884998
		c0,0-3.4248009-3.4394999-6.8535004-6.8759999c-1.7139015-1.7188001-3.4297028-3.4356-4.7187996-4.7227001
		c-0.9531021-0.9511001-1.5810013-1.5781001-2.0234032-1.9677001c-0.006897-0.0098-0.0136986-0.0186-0.0205002-0.0284
		c-0.0009995-0.0019-0.0019989-0.0029-0.0029984-0.0048l-0.0078011,0.0058c-0.6213989-0.5415-0.8670006-0.6004-1.1478996-0.4306
		l-26.0746994,0.0009c-1.7079992,0-3.0977001,1.3907001-3.0977001,3.0996001v50.5655022
		c0,0.8661995,0.3369007,1.6805992,0.9522009,2.2967987c0.6053991,0.6026001,1.4413996,0.9482994,2.2928991,0.9482994h13.1513996
		c0.5527,0,1-0.4473,1-1c0-0.5527992-0.4473-1-1-1H13.1264496c-0.3270998,0-0.6483994-0.1338005-0.8799-0.3633003
		c-0.2323999-0.232399-0.3652-0.5536995-0.3652-0.8817978V3.1427238c0-0.6064,0.4922009-1.0996001,1.0977001-1.0996001
		l25.4626007-0.0009c0.0377007,2.2823002-0.0049019,8.6077995-0.0485992,12.7186995
		c-0.002903,0.2676001,0.1016006,0.5244007,0.2891006,0.7139006c0.1875,0.1904001,0.4442978,0.2967997,0.7108994,0.2967997
		h12.7255974v38.0997009c0,0.2851028-0.1152,0.5634003-0.3173981,0.7656021
		c-0.2041016,0.2040977-0.4756012,0.3163986-0.7645988,0.3163986h-0.455101c-0.5527,0-1,0.4472008-1,1c0,0.5527,0.4473,1,1,1
		h0.455101c0.8241997,0,1.5985985-0.3213005,2.1796989-0.9033012c0.5732002-0.5732994,0.902298-1.3671989,0.902298-2.1786995
		V14.7716236C54.1186485,14.7523241,54.1087494,14.7362242,54.1076508,14.717124z M40.4038506,13.7716236
		C40.45755,8.5080242,40.4741516,5.380024,40.4585495,3.4992237c2.3398018,2.3340001,6.6297989,6.6346998,10.2538986,10.2723999
		H40.4038506z"
                          />
                          <path
                            d="M46.4301491,49.4289246c-0.0370979-0.1273003-0.0993004-0.2401009-0.1764984-0.3384018
		c1.4456978-1.7341003,2.3171997-3.9636993,2.3171997-6.3979988c0-5.5228004-4.4771996-10-10-10c-5.5228996,0-10,4.4771996-10,10
		c0,2.5708008,0.9783993,4.9075012,2.5725002,6.6790009L27.7680492,60.942524
		c-0.1103001,0.3779984,0.0117016,0.7862015,0.3116016,1.0419998c0.299799,0.2549019,0.7206993,0.3086014,1.0770988,0.1416016
		l3.4014015-1.6162033l2.1376991,3.0996017c0.1884003,0.2734985,0.4980011,0.4326973,0.8232002,0.4326973
		c0.0565987,0,0.1133003-0.0048981,0.169899-0.0146942c0.3848-0.0664024,0.6953011-0.3496017,0.7959023-0.7266045
		l2.2945976-8.5613976l2.2943001,8.5613976c0.1006012,0.3760033,0.410202,0.6592026,0.7938995,0.7266045
		c0.0577011,0.0097961,0.1152992,0.0146942,0.1719017,0.0146942c0.3241997,0,0.6319008-0.157299,0.8213005-0.4296989
		l2.1436005-3.0839996l3.3993988,1.5996017c0.3554001,0.1660004,0.7753983,0.1102982,1.0760994-0.1455002
		c0.2989006-0.2549019,0.4199982-0.6621017,0.3096008-1.0401001L46.4301491,49.4289246z M38.5708504,34.5973244
		c4.4636993,0,8.0951996,3.6315002,8.0951996,8.0951996c0,4.4637985-3.6315002,8.0952988-8.0951996,8.0952988
		c-4.4637985,0-8.0953007-3.6315002-8.0953007-8.0952988C30.4755497,38.2288246,34.1070518,34.5973244,38.5708504,34.5973244z
		 M35.1137505,60.692524l-1.3925018-2.0185013c-0.2792969-0.4043007-0.809597-0.5478973-1.2519989-0.3359985l-2.1571999,1.024498
		l2.4841995-8.5150986c1.3003006,0.9225998,2.8286018,1.5391998,4.4862022,1.7528992L35.1137505,60.692524z M45.0913506,58.3586235
		c-0.4424019-0.2080994-0.9687996-0.0654984-1.2471008,0.3348999l-1.3964996,2.0088005l-2.1875992-8.1632004
		c1.6489983-0.2812004,3.1576996-0.9631996,4.4260979-1.9464989l2.5623016,8.781601L45.0913506,58.3586235z"
                          />
                          <path
                            d="M38.5708504,47.692524c2.7613983,0,5-2.2384987,5-5c0-2.7613983-2.2386017-5-5-5c-2.7614021,0-5,2.2386017-5,5
		C33.5708504,45.4540253,35.8094482,47.692524,38.5708504,47.692524z M38.5708504,39.692524c1.6542015,0,3,1.3457985,3,3
		c0,1.6543007-1.3457985,3-3,3c-1.6543007,0-3-1.3456993-3-3C35.5708504,41.0383224,36.9165497,39.692524,38.5708504,39.692524z"
                          />
                        </g>
                      </svg>
                      <span>Download Certificate</span>
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
