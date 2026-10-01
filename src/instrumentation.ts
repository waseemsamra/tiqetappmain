/**
 * Server start hook.
 *
 * The search index costs roughly a second to build, and building it lazily
 * meant the first visitor to type absorbed that cost. Warming it here moves the
 * work into server startup instead.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const { warmSearchIndex } = await import('@/lib/search-index');
  await warmSearchIndex();
}