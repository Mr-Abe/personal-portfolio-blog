import { seedProjects } from '@/app/actions/seed-projects';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const result = await seedProjects();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to seed projects' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Error in seed projects route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 