import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/database/db";
import Projects from "@/database/projectschema";

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  // Validate request body
  if (!body.user || !body.comment) {
    return NextResponse.json({ error: 'User and comment are required' }, { status: 400 });
  }

  try {
    const project = await Projects.findOneAndUpdate(
      { slug: body.slug },
      { $push: { comments: { user: body.user, comment: body.comment } } },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while adding the comment' }, { status: 500 });
  }
}