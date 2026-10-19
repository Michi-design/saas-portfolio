import { useEffect, useRef, useState } from 'react';

const navItems = [
  'Overview',
  'My Tasks',
  'Projects',
  'Calendar',
  'Team',
  'Activity',
  'Reports',
  'Settings',
];

const pinnedProjects = ['Website redesign', 'Mobile app launch', 'Browse projects'];

const projectCards = [
  {
    name: 'Website redesign',
    description: 'A clearer digital home for Acme.',
    due: 'Due Oct 30, 2026',
    owner: 'Alex Morgan',
    memberIds: ['AM', 'MC', 'JL'],
    status: 'On track',
    progress: 68,
    tasks: 50,
    complete: 34,
    accent: 'blue',
  },
  {
    name: 'Mobile app launch',
    description: 'Build a thoughtful first release.',
    due: 'Due Oct 23, 2026',
    owner: 'Sam Patel',
    memberIds: ['SP', 'AM', 'NK'],
    status: 'At risk',
    progress: 42,
    tasks: 50,
    complete: 21,
    accent: 'amber',
  },
  {
    name: 'Brand guidelines',
    description: 'One consistent voice across every touchpoint.',
    due: 'Due Oct 28, 2026',
    owner: 'Maya Chen',
    memberIds: ['MC', 'OR'],
    status: 'On track',
    progress: 84,
    tasks: 50,
    complete: 42,
    accent: 'green',
  },
  {
    name: 'Customer portal',
    description: 'Give customers a simpler way to self-serve.',
    due: 'Due Nov 08, 2026',
    owner: 'Alex Morgan',
    memberIds: ['SP', 'PK', 'NK'],
    status: 'On track',
    progress: 36,
    tasks: 50,
    complete: 18,
    accent: 'blue',
  },
  {
    name: 'Q4 content strategy',
    description: 'Stories that bring our next chapter to life.',
    due: 'Due Oct 29, 2026',
    owner: 'Olivia Reed',
    memberIds: ['OR', 'AM'],
    status: 'On track',
    progress: 56,
    tasks: 50,
    complete: 28,
    accent: 'blue',
  },
  {
    name: 'Design system v2',
    description: 'A shared foundation for better products.',
    due: 'Due Nov 04, 2026',
    owner: 'Maya Chen',
    memberIds: ['MC', 'JL'],
    status: 'On track',
    progress: 72,
    tasks: 50,
    complete: 36,
    accent: 'green',
  },
  {
    name: 'Client onboarding',
    description: 'Make the first 30 days feel effortless.',
    due: 'Due Nov 12, 2026',
    owner: 'Sam Patel',
    memberIds: ['SP', 'OR'],
    status: 'On track',
    progress: 26,
    tasks: 50,
    complete: 13,
    accent: 'blue',
  },
  {
    name: 'Analytics workspace',
    description: 'Turn everyday signals into clearer decisions.',
    due: 'Due Nov 16, 2026',
    owner: 'Jordan Lee',
    memberIds: ['JL', 'NK'],
    status: 'On track',
    progress: 18,
    tasks: 50,
    complete: 9,
    accent: 'blue',
  },
];

const overviewCards = [
  { label: 'Active projects', value: 8, meta: 'Across Studio North' },
  { label: 'Tasks due this week', value: 12, meta: 'Oct 12 - 18 • assigned to you' },
  { label: 'Completed this week', value: 74, meta: 'Completed since week start' },
  { label: 'Overdue tasks', value: 3, meta: 'Needs your attention' },
];

const projectProgress = [
  { name: 'Website redesign', owner: 'AM', team: 'MC JL', due: 'Oct 30, 2026', progress: 68 },
  { name: 'Mobile app launch', owner: 'SP', team: 'AM NK', due: 'Oct 23, 2026', progress: 42 },
  { name: 'Brand guidelines', owner: 'MC', team: 'OR', due: 'Oct 28, 2026', progress: 84 },
];

const myTasks = [
  {
    group: 'Today · 2',
    items: [
      { title: 'Approve launch messaging', project: 'Mobile app launch', due: 'Oct 14', owner: 'AM', status: 'todo' },
      { title: 'Review release checklist', project: 'Mobile app launch', due: 'Oct 14', owner: 'AM', status: 'todo' },
    ],
  },
  {
    group: 'Upcoming · 2',
    items: [
      { title: 'Finalize homepage wireframes', project: 'Website redesign', due: 'Oct 16', owner: 'AM', status: 'todo' },
      { title: 'Review October content outline', project: 'Q4 content strategy', due: 'Oct 15', owner: 'AM', status: 'todo' },
    ],
  },
  {
    group: 'Overdue · 1',
    items: [{ title: 'Audit mobile accessibility', project: 'Website redesign', due: 'Oct 12', owner: 'AM', status: 'overdue' }],
  },
  {
    group: 'Completed · 2',
    items: [
      { title: 'Map content hierarchy', project: 'Website redesign', due: 'Oct 13', owner: 'AM', status: 'done' },
      { title: 'Share discovery summary', project: 'Website redesign', due: 'Oct 09', owner: 'AM', status: 'done' },
    ],
  },
];

const teamMembers = [
  { name: 'Alex Morgan', role: 'Admin', team: 'Studio North', initials: 'AM', color: 'sand', workload: 8 },
  { name: 'Maya Chen', role: 'Member', team: 'Brand product design', initials: 'MC', color: 'mint', workload: 10 },
  { name: 'Jordan Lee', role: 'Member', team: 'Frontend engineering', initials: 'JL', color: 'peach', workload: 7 },
  { name: 'Sam Patel', role: 'Admin', team: 'Product strategy', initials: 'SP', color: 'amber', workload: 12 },
  { name: 'Olivia Reed', role: 'Member', team: 'Content & copywriting', initials: 'OR', color: 'lavender', workload: 6 },
  { name: 'Noah Kim', role: 'Guest', team: 'Quality assurance', initials: 'NK', color: 'blue', workload: 5 },
];

const activityFeed = [
  { user: 'Maya Chen', action: 'updated a project', detail: 'Navigation exploration is ready for feedback.', project: 'Website redesign', time: '10:32 AM', color: 'mint', read: false },
  { user: 'Alex Morgan', action: 'completed a task', detail: 'Map content hierarchy • Finalize homepage wireframes', project: 'Website redesign', time: '10:18 AM', color: 'lavender', read: false },
  { user: 'Jordan Lee', action: 'completed a task', detail: 'Build responsive header → Done', project: 'Website redesign', time: '10:04 AM', color: 'peach', read: false },
  { user: 'Maya Chen', action: 'mentioned you in a comment', detail: '“Alex can we bring customer proof section above the fold on mobile?”', project: 'Finalize homepage wireframes', time: '9:42 AM', color: 'mint', read: true },
  { user: 'Sam Patel', action: 'shared a file', detail: 'Release plan v1.pdf • 1.8 MB', project: 'Mobile app launch', time: '9:30 AM', color: 'amber', read: true },
];

const reportsStats = [
  { label: 'Tasks completed', value: 74, meta: 'Oct 5-11, 2026' },
  { label: 'Active projects', value: 8, meta: '7 on track • 1 at risk' },
  { label: 'Open assigned tasks', value: 48, meta: 'Across six teammates' },
  { label: 'Overdue tasks', value: 3, meta: 'Across the workspace' },
];

const weeklyCompletions = [
  { day: 'Mon', count: 8 },
  { day: 'Tue', count: 12 },
  { day: 'Wed', count: 10 },
  { day: 'Thu', count: 16 },
  { day: 'Fri', count: 18 },
  { day: 'Sat', count: 6 },
  { day: 'Sun', count: 4 },
];

const taskStatusLegend = [
  { name: 'Task', color: 'ghost' },
  { name: 'Milestone', color: 'green' },
  { name: 'Overdue', color: 'red' },
];

const calendarEntries = [
  { day: 5, text: 'Team planning', color: 'lavender' },
  { day: 9, text: 'Discovery complete', color: 'green' },
  { day: 12, text: 'Accessibility audit', color: 'red' },
  { day: 14, text: 'Navigation review', color: 'lavender' },
  { day: 15, text: 'Brand asset export', color: 'lavender' },
  { day: 16, text: 'Homepage wireframes', color: 'purple' },
  { day: 17, text: 'Launch messaging', color: 'lavender' },
  { day: 19, text: 'Product gap copy', color: 'lavender' },
  { day: 20, text: 'Responsive grid', color: 'lavender' },
  { day: 21, text: 'Localization plan', color: 'stone' },
  { day: 23, text: 'Customer story', color: 'lavender' },
  { day: 24, text: 'Mobile app launch', color: 'green' },
  { day: 26, text: 'Q4 content strategy', color: 'green' },
  { day: 30, text: 'Brand guidelines', color: 'green' },
  { day: 31, text: 'Acme website handoff', color: 'green' },
];

function App() {
  const [sessionPhase, setSessionPhase] = useState('auth');
  const [activePage, setActivePage] = useState('Overview');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    if (!showProjectModal && !showTaskModal) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showProjectModal, showTaskModal]);

  if (sessionPhase === 'auth') {
    return <SignInPage onContinue={() => setSessionPhase('onboarding')} />;
  }

  if (sessionPhase === 'onboarding') {
    return (
      <WorkspaceOnboardingPage
        onContinue={() => setSessionPhase('invite')}
        onBack={() => setSessionPhase('auth')}
      />
    );
  }

  if (sessionPhase === 'invite') {
    return (
      <InviteTeamPage
        onContinue={() => setSessionPhase('workspace')}
        onBack={() => setSessionPhase('onboarding')}
      />
    );
  }

  const pageContent = (() => {
    switch (activePage) {
      case 'Overview':
        return <OverviewPage onCreateProject={() => setShowProjectModal(true)} onCreateTask={() => setShowTaskModal(true)} />;
      case 'My Tasks':
        return <MyTasksPage onCreateTask={() => setShowTaskModal(true)} />;
      case 'Projects':
        return <ProjectsPage onCreateProject={() => setShowProjectModal(true)} />;
      case 'Calendar':
        return <CalendarPage onCreateTask={() => setShowTaskModal(true)} />;
      case 'Team':
        return <TeamPage />;
      case 'Activity':
        return <ActivityPage />;
      case 'Reports':
        return <ReportsPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <OverviewPage onCreateProject={() => setShowProjectModal(true)} onCreateTask={() => setShowTaskModal(true)} />;
    }
  })();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark">✓</div>
          <span>Taskflow</span>
        </div>

        <div className="workspace-box">SN Studio North</div>

        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${activePage === item ? 'active' : ''}`}
              onClick={() => setActivePage(item)}
              type="button"
            >
              <span className="nav-icon">{labelIcon(item)}</span>
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="pinned-panel">
          <div className="section-label">Pinned projects</div>
          {pinnedProjects.map((project, index) => (
            <div key={project} className={`pinned-item ${index === 0 ? 'active' : ''}`}>
              <span className="dot" />
              <span>{project}</span>
            </div>
          ))}
          <button className="add-project" type="button">+ Browse projects</button>
        </div>

        <div className="sidebar-footer">
          <div className="support">Help and support</div>
          <div className="user-mini">
            <div className="avatar am">AM</div>
            <div>
              <div className="name">Alex Morgan</div>
              <div className="role">Workspace admin</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            {activePage === 'Overview' ? (
              <span className="crumb">Overview</span>
            ) : (
              <div className="crumbs">
                <span>Projects</span>
                <span className="slash">/</span>
                <span>Website redesign</span>
              </div>
            )}
          </div>

          <div className="topbar-actions">
            <div className="search-box">Search tasks and projects <span>⌘ K</span></div>
            <button className="secondary-btn" type="button" onClick={() => setShowProjectModal(true)}>
              + Create
            </button>
            <button className="icon-btn" type="button" aria-label="Notifications">◌</button>
            <div className="avatar am small">AM</div>
          </div>
        </header>

        {pageContent}
      </main>

      {showProjectModal && <CreateProjectModal onClose={() => setShowProjectModal(false)} setPage={setActivePage} />}
      {showTaskModal && <CreateTaskModal onClose={() => setShowTaskModal(false)} />}
    </div>
  );
}

function SignInPage({ onContinue }) {
  return (
    <div className="auth-shell">
      <header className="auth-header">
        <div className="brand-row">
          <div className="brand-mark">✓</div>
          <span>Taskflow</span>
        </div>
        <div className="auth-link">New here? Create an account</div>
      </header>

      <div className="auth-grid">
        <section className="auth-intro">
          <div className="eyebrow">Let’s make room for great work</div>
          <h1>Your team’s next chapter starts here.</h1>
          <p>Tell us a little about your work. We’ll help you build a workspace that feels like yours.</p>

          <div className="auth-steps">
            <div className="auth-step complete">
              <span className="badge">✓</span>
              <div>
                <strong>Your account</strong>
                <small>Alex Morgan · alex@studio-north.co</small>
              </div>
            </div>
            <div className="auth-step upcoming">
              <span className="badge">02</span>
              <div>
                <strong>Set up your workspace</strong>
                <small>A few details to get started</small>
              </div>
            </div>
            <div className="auth-step upcoming">
              <span className="badge">03</span>
              <div>
                <strong>Bring your team</strong>
                <small>Good work is better together</small>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-panel">
          <div className="signin-card">
            <div className="auth-card-header">Welcome back.</div>
            <div className="subtle-copy">Your projects, people, and next big ideas. All here.</div>
            <button className="signin-btn" type="button">G Continue with Google</button>
            <div className="divider-line"><span>or sign in with email</span></div>

            <label className="field auth-field">
              <span>Work email</span>
              <input defaultValue="alex@studio-north.co" />
            </label>

            <label className="field auth-field">
              <span>Password</span>
              <input type="password" defaultValue="************" />
            </label>

            <div className="remember-row">
              <label className="checkbox-row"><input type="checkbox" defaultChecked /> Remember me for 30 days</label>
            </div>

            <button className="primary-btn full-btn" type="button" onClick={onContinue}>Sign in →</button>
            <div className="mini-legal">By continuing, you agree to our <span>Terms</span> and <span>Privacy Policy</span>.</div>
          </div>
        </section>
      </div>
    </div>
  );
}

function WorkspaceOnboardingPage({ onContinue, onBack }) {
  return (
    <div className="auth-shell onboarding-shell">
      <header className="auth-header compact-header">
        <div className="brand-row">
          <div className="brand-mark">✓</div>
          <span>Taskflow</span>
        </div>
        <div className="auth-header-meta">Studio North · Workspace setup</div>
      </header>

      <div className="onboarding-modal">
        <div className="step-label">STEP 2 OF 3</div>
        <h2>Welcome, Alex.</h2>
        <p>Let’s set up Studio North.</p>

        <label className="field auth-field">
          <span>Workspace name *</span>
          <input defaultValue="Studio North" />
        </label>

        <div className="muted-note">Your team’s shared home. You can change this later.</div>

        <label className="field auth-field">
          <span>How many people are on your team?</span>
          <select defaultValue="6–10 people">
            <option>6–10 people</option>
            <option>1–5 people</option>
            <option>11–20 people</option>
          </select>
        </label>

        <label className="field auth-field">
          <span>What’s your role?</span>
          <select defaultValue="Designer / project lead">
            <option>Designer / project lead</option>
            <option>Engineer</option>
            <option>Marketing</option>
          </select>
        </label>

        <div className="field auth-field">
          <span>What would you like to focus on first?</span>
          <div className="choice-list">
            <label className="choice-row"><input type="radio" name="focus" /> <span>Manage my own projects</span></label>
            <label className="choice-row"><input type="radio" name="focus" defaultChecked /> <span>Collaborate with my team</span></label>
            <label className="choice-row"><input type="radio" name="focus" /> <span>Organize client work</span></label>
          </div>
        </div>

        <div className="modal-footer split-footer">
          <button className="secondary-btn" type="button" onClick={onBack}>← Back</button>
          <button className="primary-btn" type="button" onClick={onContinue}>Next: invite your team →</button>
        </div>
      </div>
    </div>
  );
}

function InviteTeamPage({ onContinue, onBack }) {
  return (
    <div className="auth-shell onboarding-shell">
      <header className="auth-header compact-header">
        <div className="brand-row">
          <div className="brand-mark">✓</div>
          <span>Taskflow</span>
        </div>
        <div className="auth-header-meta">Studio North · Workspace setup</div>
      </header>

      <div className="invite-layout">
        <section className="intro-copy">
          <div className="eyebrow">Better, together</div>
          <h1>Bring your people into the picture.</h1>
          <p>Invite your teammates to Studio North. Share ownership, stay in sync, and make progress together.</p>

          <div className="success-checks">
            <div><span>✓</span> Account created</div>
            <div><span>✓</span> Workspace ready</div>
          </div>

          <div className="mini-stack">
            <span className="team-badge am">AM</span>
            <span className="team-badge mc">MC</span>
            <span className="team-badge jl">JL</span>
            <span className="team-badge sp">SP</span>
          </div>

          <div className="small-note">You can add more people anytime from Team.</div>
        </section>

        <section className="invite-panel-box">
          <div className="step-label">STEP 3 OF 3</div>
          <h2>Make room for your team.</h2>
          <p>They’ll get an email with a link to join your workspace.</p>

          <div className="row-fields">
            <label className="field auth-field"><span>Email address</span><input defaultValue="maya@studio-north.co" /></label>
            <label className="field auth-field"><span>Role</span><select defaultValue="Member" /></label>
          </div>

          <div className="row-fields">
            <label className="field auth-field"><span>Email address</span><input defaultValue="jordan@studio-north.co" /></label>
            <label className="field auth-field"><span>Role</span><select defaultValue="Member" /></label>
          </div>

          <div className="row-fields">
            <label className="field auth-field"><span>Email address</span><input defaultValue="sam@studio-north.co" /></label>
            <label className="field auth-field"><span>Role</span><select defaultValue="Admin" /></label>
          </div>

          <button className="secondary-btn pill-btn" type="button">+ Add another teammate</button>

          <div className="modal-footer split-footer invite-footer">
            <button className="secondary-btn" type="button" onClick={onBack}>← Back</button>
            <button className="primary-btn" type="button" onClick={onContinue}>Send 3 invitations →</button>
          </div>
        </section>
      </div>
    </div>
  );
}

function labelIcon(item) {
  const icons = {
    Overview: '◫',
    'My Tasks': '◔',
    Projects: '▣',
    Calendar: '◫',
    Team: '◌',
    Activity: '◍',
    Reports: '▤',
    Settings: '⚙',
  };

  return icons[item] || '•';
}

function OverviewPage({ onCreateProject, onCreateTask }) {
  return (
    <div className="page overview-page">
      <div className="page-head-row">
        <div>
          <div className="eyebrow">STUDIO NORTH / WORKSPACE OVERVIEW</div>
          <h1>A clear day ahead, Alex.</h1>
          <p>Your team’s work, in perspective. Let’s keep things moving.</p>
        </div>
      </div>

      <div className="stats-row">
        {overviewCards.map((card) => (
          <div className="stat-card" key={card.label}>
            <div className="stat-label">{card.label}</div>
            <div className="stat-value">{card.value}</div>
            <div className="stat-meta">{card.meta}</div>
          </div>
        ))}
      </div>

      <div className="content-split">
        <section className="panel">
          <div className="panel-header">
            <h3>Project progress</h3>
            <button className="light-btn" type="button">All projects</button>
          </div>

          <div className="progress-list">
            {projectProgress.map((project) => (
              <div className="progress-row" key={project.name}>
                <div className="project-meta">
                  <span className={`mini-avatar ${project.owner.toLowerCase()}`}>{project.owner}</span>
                  <div>
                    <div className="project-title">{project.name}</div>
                    <div className="project-sub">Due {project.due}</div>
                  </div>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                </div>
                <div className="team-badges">
                  {project.team.split(' ').map((member) => (
                    <span key={member} className="tiny-badge">{member}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="side-stack">
          <div className="panel compact-panel">
            <div className="panel-header narrow">
              <h3>Weekly productivity</h3>
              <button className="text-btn" type="button">View report</button>
            </div>
            <div className="big-number">74</div>
            <div className="muted-row">tasks completed</div>
            <div className="bar-chart">
              {weeklyCompletions.map(({ day, count }) => (
                <span key={day} style={{ height: `${(count / 18) * 100}%` }} />
              ))}
            </div>
            <div className="chart-days">
              {weeklyCompletions.map(({ day }) => <span key={day}>{day}</span>)}
            </div>
          </div>

          <div className="panel compact-panel">
            <div className="panel-header narrow">
              <h3>Coming up</h3>
              <button className="text-btn" type="button">Calendar</button>
            </div>
            <div className="coming-up">
              <div className="coming-item">
                <span className="date-pill stacked"><small>OCT</small><strong>16</strong></span>
                <div>
                  <div className="item-name">Homepage wireframes</div>
                  <div className="item-meta">Website redesign · Alex</div>
                </div>
              </div>
              <div className="coming-item">
                <span className="date-pill stacked"><small>OCT</small><strong>23</strong></span>
                <div>
                  <div className="item-name">Mobile app launch</div>
                  <div className="item-meta">Release milestone · Sam</div>
                </div>
              </div>
              <div className="coming-item">
                <span className="date-pill stacked"><small>OCT</small><strong>30</strong></span>
                <div>
                  <div className="item-name">Acme website handoff</div>
                  <div className="item-meta">Website redesign · Team</div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel compact-panel">
            <div className="panel-header narrow">
              <h3>Team activity</h3>
              <button className="text-btn" type="button">View all</button>
            </div>
            {[
              { initials: 'MC', text: 'Maya updated navigation' },
              { initials: 'JL', text: 'Jordan completed the header' },
              { initials: 'SP', text: 'Sam shared the release plan' },
            ].map((item) => (
              <div key={item.text} className="activity-line">
                <span className="mini-avatar cm">{item.initials}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="panel tasks-panel">
        <div className="panel-header">
          <h3>Your focus</h3>
          <span className="muted">My Tasks</span>
        </div>
        <div className="focus-table">
          <div className="table-head">
            <span>Task / Project</span>
            <span>Priority</span>
            <span>Due</span>
            <span>Status</span>
            <span>Owner</span>
          </div>
          {[
            ['Finalize homepage wireframes', 'Website redesign', 'High', 'Oct 16', 'In progress', 'AM'],
            ['Review navigation structure', 'Website redesign', 'Medium', 'Oct 14', 'In review', 'MC'],
            ['Approve launch messaging', 'Mobile app launch', 'High', 'Oct 14', 'To do', 'AM'],
            ['Export brand asset library', 'Brand guidelines', 'Low', 'Oct 15', 'In progress', 'MC'],
            ['Audit mobile accessibility', 'Website redesign', 'High', 'Oct 12', 'Overdue', 'AM'],
          ].map(([task, project, priority, due, status, owner]) => (
            <div className="table-row" key={task}>
              <div className="task-name-wrap">
                <span className="circle-check" />
                <span>{task}</span>
              </div>
              <span>{project}</span>
              <span>{priority}</span>
              <span>{due}</span>
              <span>{status}</span>
              <span>{owner}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MyTasksPage({ onCreateTask }) {
  return (
    <div className="page tasks-page">
      <div className="page-head-row inline-actions">
        <div>
          <h1>My Tasks</h1>
          <p>A little focus goes a long way. Here’s what’s on your plate.</p>
        </div>
        <button className="primary-btn" type="button" onClick={onCreateTask}>+ Create task</button>
      </div>

      <div className="filter-row compact">
        <input className="search-input" value="Search your tasks..." readOnly />
        <select defaultValue="Project: all"><option>Project: all</option></select>
        <select defaultValue="Priority: all"><option>Priority: all</option></select>
        <select defaultValue="Status: all"><option>Status: all</option></select>
        <select defaultValue="Group: due date"><option>Group: due date</option></select>
      </div>

      <div className="tasks-list-wrap">
        <div className="task-groups">
          {myTasks.map((group) => (
            <div key={group.group} className="task-group">
              <div className="group-header">
                <h4>{group.group}</h4>
                <span>{group.items.length === 1 ? '1 task' : `${group.items.length} tasks`}</span>
              </div>
              {group.items.map((item) => (
                <div key={item.title} className={`task-item ${item.status}`}>
                  <span className="checkmark" />
                  <span className="task-title">{item.title}</span>
                  <span className="task-project">{item.project}</span>
                  <span className="task-due">{item.due}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <aside className="page-aside">
          <div className="info-card">
            <div className="small-label">Today’s focus</div>
            <div className="focus-count">2 tasks</div>
            <div className="focus-copy">Start with launch messaging, then review the release checklist.</div>
          </div>
          <div className="info-card compact-card">
            <div className="small-label">My Tasks / Filtered</div>
            <div className="filter-box">Project: Brand guidelines</div>
            <div className="filter-box">Priority: High</div>
            <div className="empty-box">No tasks match your filters.</div>
          </div>
          <div className="info-card quick-update">
            <div className="small-label">Quick update</div>
            <div className="checkbox-row">
              <span className="checkmark selected" />
              <span>Map content hierarchy</span>
            </div>
            <button className="primary-btn small" type="button">Open task details →</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProjectsPage({ onCreateProject }) {
  return (
    <div className="page projects-page">
      <div className="page-head-row inline-actions">
        <div>
          <h1>All projects</h1>
          <p>Eight moving parts. One shared direction.</p>
        </div>
        <button className="primary-btn" type="button" onClick={onCreateProject}>+ Create project</button>
      </div>

      <div className="project-toolbar">
        <div className="segment-control">
          <button className="segment active" type="button">Active projects · 8</button>
          <button className="segment" type="button">Archived · 3</button>
        </div>

        <div className="toolbar-right">
          <input className="search-input" value="Search projects..." readOnly />
          <select defaultValue="All statuses"><option>All statuses</option></select>
          <select defaultValue="All members"><option>All members</option></select>
          <select defaultValue="Last updated"><option>Last updated</option></select>
        </div>
      </div>

      <div className="project-grid">
        {projectCards.map((project) => (
          <article key={project.name} className="project-card">
            <div className="project-card-top">
              <span className={`mini-avatar ${project.accent}`}>{project.name.slice(0, 2).toUpperCase()}</span>
              <button className="dot-menu" type="button">⋯</button>
            </div>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <div className="status-row">
              <span className={`status-pill ${project.status === 'At risk' ? 'risk' : ''}`}>{project.status}</span>
              <span className="project-duedate">{project.due}</span>
            </div>
            <div className="progress-track compact-track">
              <div className="progress-fill" style={{ width: `${project.progress}%` }} />
            </div>
            <div className="project-card-footer">
              <div className="team-badges small-badges">
                {project.memberIds.map((id) => (
                  <span key={id} className="tiny-badge">{id}</span>
                ))}
              </div>
              <div className="project-count">{project.complete}/{project.tasks} tasks</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CalendarPage({ onCreateTask }) {
  return (
    <div className="page calendar-page">
      <div className="page-head-row inline-actions">
        <div>
          <h1>Calendar</h1>
          <p>A shared view of what’s coming. No surprises, just a plan.</p>
        </div>
        <button className="primary-btn" type="button" onClick={onCreateTask}>+ Create task</button>
      </div>

      <div className="calendar-toolbar">
        <div className="calendar-controls">
          <button className="month-nav" type="button">‹</button>
          <button className="month-nav" type="button">›</button>
          <div className="month-title">October 2026</div>
        </div>
        <div className="calendar-filters">
          <button className="light-btn" type="button">All projects</button>
          <button className="light-btn" type="button">Month</button>
        </div>
      </div>

      <div className="calendar-layout">
        <div className="calendar-grid-wrap">
          <div className="calendar-grid">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="weekday-header">{day}</div>
            ))}
            {Array.from({ length: 35 }, (_, index) => {
              const dayNumber = index - 2;
              const inMonth = dayNumber >= 1 && dayNumber <= 31;
              const displayDate = dayNumber < 1 ? 30 + dayNumber : dayNumber > 31 ? dayNumber - 31 : dayNumber;
              const entry = inMonth ? calendarEntries.find((item) => item.day === dayNumber) : null;
              return (
                <div key={index} className={`calendar-cell ${inMonth ? '' : 'empty'}`}>
                  <span className="date-number">{displayDate}</span>
                  {entry && <span className={`entry-badge ${entry.color}`}>{entry.text}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="calendar-aside">
          <div className="panel side-calendar-panel">
            <div className="panel-header narrow">
              <h3>Friday, October 16</h3>
              <button className="text-btn" type="button">×</button>
            </div>
            <div className="label-small">SELECTED TASK · WEB-024</div>
            <h4>Finalize homepage wireframes</h4>
            <div className="task-meta">Website redesign</div>
            <div className="priority-tag red">High</div>
            <div className="task-owner">AM Alex Morgan</div>
            <p>Finalize desktop and mobile wireframes for Acme’s review.</p>
            <button className="primary-btn" type="button">Open task details →</button>
          </div>

          <div className="panel mini-panel">
            <h3>Calendar legend</h3>
            {taskStatusLegend.map((item) => (
              <div key={item.name} className="legend-row">
                <span className={`legend-dot ${item.color}`} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function TeamPage() {
  const inviteEmailRef = useRef(null);
  const [inviteStatus, setInviteStatus] = useState('');

  return (
    <div className="page team-page">
      <div className="page-head-row inline-actions">
        <div>
          <h1>Good work is a team effort.</h1>
          <p>Six people. Different strengths. One Studio North.</p>
        </div>
        <button
          className="primary-btn"
          type="button"
          onClick={() => {
            inviteEmailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            inviteEmailRef.current?.focus();
          }}
        >
          + Invite member
        </button>
      </div>

      <div className="stats-row team-stats">
        <div className="stat-card"><div className="stat-label">Members</div><div className="stat-value">6</div></div>
        <div className="stat-card"><div className="stat-label">Workspace admins</div><div className="stat-value">2</div></div>
        <div className="stat-card"><div className="stat-label">Opened tasks</div><div className="stat-value">48</div></div>
        <div className="stat-card"><div className="stat-label">Guest collaborators</div><div className="stat-value">1</div></div>
      </div>

      <div className="team-layout">
        <section className="panel">
          <div className="panel-header"><h3>Workspace members · 6</h3><select defaultValue="All roles"><option>All roles</option></select></div>
          {teamMembers.map((member) => (
            <div key={member.name} className="member-row">
              <div className="member-main">
                <span className={`avatar ${member.color}`}>{member.initials}</span>
                <div>
                  <div className="member-name">{member.name}</div>
                  <div className="member-role">{member.team}</div>
                </div>
              </div>
              <div className="member-role-badge">{member.role}</div>
              <div className="member-task-count">{member.workload} tasks</div>
            </div>
          ))}
        </section>

        <aside className="team-aside">
          <div className="panel invite-panel">
            <div className="panel-header narrow"><h3>Invite someone to Studio North</h3><button className="text-btn" type="button">×</button></div>
            <p>A little more teamwork starts here.</p>
            <label className="field">Email address<input ref={inviteEmailRef} type="email" defaultValue="riley@acme.co" required /></label>
            <label className="field">Workspace role<select defaultValue="Guest"><option>Guest</option><option>Member</option><option>Admin</option></select></label>
            <label className="field">Project access<select defaultValue="Website redesign"><option>Website redesign</option><option>Mobile app launch</option><option>Brand guidelines</option></select></label>
            <label className="checkbox-row centered"><input type="checkbox" defaultChecked /> Send invitation by email</label>
            <button
              className="primary-btn"
              type="button"
              onClick={() => {
                if (!inviteEmailRef.current?.reportValidity()) return;
                setInviteStatus(`Invitation staged for ${inviteEmailRef.current.value}. Demo only — no email was sent.`);
              }}
            >
              Send invitation
            </button>
            {inviteStatus && <p className="invite-status" role="status">{inviteStatus}</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ActivityPage() {
  return (
    <div className="page activity-page">
      <div className="page-head-row inline-actions">
        <div>
          <h1>Stay in the loop.</h1>
          <p>The important updates, with all the context. 3 unread notifications.</p>
        </div>
        <button className="primary-btn" type="button">Mark all as read</button>
      </div>

      <div className="activity-layout">
        <section className="panel">
          <div className="filters-row">
            <button className="light-btn active" type="button">All activity</button>
            <button className="light-btn" type="button">Unread · 3</button>
            <button className="light-btn" type="button">Assigned to me</button>
          </div>

          {activityFeed.map((item) => (
            <div key={`${item.user}-${item.time}`} className={`activity-item ${item.read ? 'read' : 'unread'}`}>
              <div className={`avatar ${item.color}`}>{item.user.slice(0, 2).toUpperCase()}</div>
              <div className="activity-copy">
                <div className="activity-main"><strong>{item.user}</strong> {item.action}</div>
                <div className="activity-detail">{item.detail}</div>
                <div className="activity-meta">{item.project} · {item.time}</div>
              </div>
              <button className="dot-menu" type="button">⋯</button>
            </div>
          ))}
        </section>

        <aside className="page-aside narrow-aside">
          <div className="panel info-card">
            <h3>Your notification inbox</h3>
            <div className="count">3 unread</div>
            <ul className="bullet-list">
              <li>Updates that help you keep work moving.</li>
              <li>Assignments and due dates.</li>
              <li>Mentions and replies.</li>
            </ul>
          </div>
          <div className="panel info-card">
            <h3>Make it your own</h3>
            <p>Choose when and where Taskflow gets your attention.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="page reports-page">
      <div className="page-head-row inline-actions">
        <div>
          <h1>Progress, with perspective.</h1>
          <p>A clear view of delivery, project health, and your team’s workload.</p>
        </div>
        <button className="primary-btn" type="button">Export report</button>
      </div>

      <div className="report-toolbar">
        <div className="segment-control small-segment">
          <button className="segment active" type="button">Weekly</button>
          <button className="segment" type="button">Monthly</button>
        </div>
        <div className="toolbar-right">
          <span className="date-pill small">Oct 5–11, 2026</span>
          <button className="light-btn" type="button">All projects</button>
        </div>
      </div>

      <div className="stats-row four-grid">
        {reportsStats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-meta">{stat.meta}</div>
          </div>
        ))}
      </div>

      <div className="report-bottom-grid">
        <section className="panel">
          <div className="panel-header">
            <h3>Task completion trend</h3>
          </div>
          <div className="chart-box">
            {weeklyCompletions.map(({ day, count }) => (
              <div key={day} className="bar-col">
                <span style={{ height: `${(count / 18) * 80}%` }} />
                <small>{day}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>What the sample shows</h3>
          <p className="report-copy">34 tasks on Thursday and Friday. That’s 46% of the 74 completions in this sample week. The team had the highest daily total, with 18.</p>
          <p className="report-copy small">This analysis is based on a sample of tasks and may not represent your full team history.</p>
        </section>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page settings-page">
      <div className="page-head-row">
        <div>
          <h1>Workspace settings</h1>
          <p>Make Studio North work the way your team does.</p>
        </div>
      </div>

      <div className="tabs-row">
        {['General', 'Members & roles', 'Notifications', 'Integrations', 'Billing'].map((tab, index) => (
          <button key={tab} className={`tab ${index === 0 ? 'active' : ''}`} type="button">{tab}</button>
        ))}
      </div>

      <div className="settings-grid">
        <section className="panel">
          <div className="panel-header"><h3>Workspace profile</h3><button className="light-btn" type="button">Change logo</button></div>
          <div className="form-grid">
            <label className="field large">Workspace name<input defaultValue="Studio North" /></label>
            <label className="field">Workspace URL<input defaultValue="taskflow.app/studio-north" /></label>
            <label className="field full">Description<input defaultValue="Independent minds. Thoughtful digital experiences." /></label>
          </div>

          <h3>Notification preferences</h3>
          <div className="toggle-row"><span>Email digest</span><span className="switch on" /></div>
          <div className="toggle-row"><span>Mentions and replies</span><span className="switch on" /></div>
          <div className="toggle-row"><span>Project status updates</span><span className="switch off" /></div>

          <h3>General preferences</h3>
          <div className="form-grid two-col">
            <label className="field">Timezone<select defaultValue="New York (UTC-4)"><option>New York (UTC-4)</option></select></label>
            <label className="field">Language<select defaultValue="English (US)"><option>English (US)</option></select></label>
            <label className="field">Week starts on<select defaultValue="Monday"><option>Monday</option></select></label>
            <label className="field">Date format<select defaultValue="MMM DD, YYYY"><option>MMM DD, YYYY</option></select></label>
          </div>

          <div className="footer-actions">
            <button className="text-btn" type="button">Discard changes</button>
            <button className="primary-btn" type="button">Save changes</button>
          </div>
        </section>

        <aside className="settings-aside">
          <div className="panel side-card">
            <div className="panel-header narrow"><h3>Members & roles</h3><button className="text-btn" type="button">Manage</button></div>
            {teamMembers.map((member) => (
              <div key={member.name} className="member-row compact-member">
                <div className="member-main">
                  <span className={`avatar ${member.color}`}>{member.initials}</span>
                  <div className="member-name">{member.name}</div>
                </div>
                <span className="member-role-badge">{member.role}</span>
              </div>
            ))}
          </div>

          <div className="panel side-card success-card">
            <div className="tag">AFTER SAVE CHANGES</div>
            <div className="success-row">✓ Workspace settings saved</div>
            <p>Your team’s preferences are up to date.</p>
          </div>

          <div className="panel side-card validation-card">
            <div className="tag danger">IF A REQUIRED VALUE IS CLEARED</div>
            <div className="error-field">Workspace name *<br />Workspace name is required</div>
            <p>Enter a workspace name to save. This example is separate from the saved profile.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CreateProjectModal({ onClose, setPage }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card create-project" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>Create a project</h2>
          <button className="close-btn" type="button" onClick={onClose}>×</button>
        </div>

        <div className="subhead">Studio North / New project</div>
        <p>Give the next big thing a clear place to start.</p>
        <div className="required-note">Fields marked <span>*</span> are required</div>

        <div className="field-block">
          <label className="field">Project name *<input defaultValue="Website redesign" /></label>
        </div>

        <div className="field-block error-field-block">
          <div className="validation">VALIDATION · IF NAME IS EMPTY</div>
          <div className="error-box">
            <div className="error-title">Project name *</div>
            <div>Project name is required</div>
          </div>
        </div>

        <div className="field-block inline-fields">
          <label className="field">Project owner *<select defaultValue="Alex Morgan"><option>Alex Morgan</option><option>Maya Chen</option><option>Jordan Lee</option><option>Sam Patel</option></select></label>
          <label className="field">Team members<select defaultValue="Maya, Jordan"><option>Maya, Jordan</option><option>All team members</option><option>Alex Morgan</option></select></label>
        </div>

        <div className="field-block inline-fields">
          <label className="field">Start date<input defaultValue="Oct 05, 2026" /></label>
          <label className="field">Deadline *<input defaultValue="Oct 30, 2026" /></label>
        </div>

        <label className="checkbox-row"><input type="radio" name="project-start" defaultChecked /> Website project</label>
        <label className="checkbox-row"><input type="radio" name="project-start" /> Start from scratch</label>

        <div className="modal-actions">
          <button className="secondary-btn" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-btn" type="button" onClick={() => { setPage('Projects'); onClose(); }}>Create project →</button>
        </div>
      </div>
    </div>
  );
}

function CreateTaskModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card create-task" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>Create a task</h2>
          <button className="close-btn" type="button" onClick={onClose}>×</button>
        </div>

        <div className="subhead">Studio North / Website redesign</div>
        <p>Turn the next step into something your team can move forward.</p>
        <div className="required-note">Fields marked <span>*</span> are required</div>

        <div className="field-block">
          <label className="field">Task title *<input defaultValue="Finalize homepage wireframes" /></label>
        </div>

        <div className="field-block">
          <label className="field">Description<input defaultValue="Refine desktop and mobile homepage wireframes for Acme." /></label>
        </div>

        <div className="field-block inline-fields">
          <label className="field">Project<select defaultValue="Website redesign"><option>Website redesign</option><option>Mobile app launch</option><option>Brand guidelines</option></select></label>
          <label className="field">Assignee<select defaultValue="Alex Morgan"><option>Alex Morgan</option><option>Maya Chen</option><option>Jordan Lee</option><option>Sam Patel</option></select></label>
        </div>

        <div className="field-block inline-fields">
          <label className="field">Priority<select defaultValue="High"><option>High</option><option>Medium</option><option>Low</option></select></label>
          <label className="field">Status<select defaultValue="In progress"><option>To do</option><option>In progress</option><option>In review</option><option>Done</option></select></label>
        </div>

        <div className="field-block inline-fields">
          <label className="field">Start date<input defaultValue="Oct 12, 2026" /></label>
          <label className="field">Due date *<input defaultValue="Oct 16, 2026" /></label>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-row"><input type="checkbox" /> Map content hierarchy</label>
          <label className="checkbox-row"><input type="checkbox" /> Refine desktop homepage</label>
          <label className="checkbox-row"><input type="checkbox" /> Prepare mobile wireframes</label>
        </div>

        <div className="modal-actions">
          <button className="secondary-btn" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-btn" type="button" onClick={onClose}>Create task →</button>
        </div>
      </div>
    </div>
  );
}

export default App;
