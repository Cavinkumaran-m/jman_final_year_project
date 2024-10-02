// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/configs/Prisma";
// import { renderToStaticMarkup } from "react-dom/server";
// import Button from "@/components/Button";
// import pdf from "html-pdf";
// import componentToPDFBuffer from "@/configs/helper";

// export async function GET(request: NextRequest) {
//   const buffer = await componentToPDFBuffer(<Button>Hi bRo</Button>);

//   const headers = new Headers({
//     "Content-Disposition": 'attachment; filename="article.pdf"',
//     "Content-Type": "application/pdf",
//   });

//   // Return the PDF buffer as a response
//   return new NextResponse(buffer, { headers });
// }

// // export async function POST(request: NextRequest) {}
