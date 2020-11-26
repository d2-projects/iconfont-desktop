const transformCommitType = (type) => {
  const commitTypeMapping = {
    feat: '功能',
    fix: '修复',
    perf: '优化',
    revert: '回滚',
    docs: '文档',
    style: '格式',
    refactor: '重构',
    test: '测试',
    build: '构建工具',
    ci: '持续集成',
    chore: '杂务',
    default: '其他'
  }
  return commitTypeMapping[type] || commitTypeMapping.default
}

const customTransform = (commit, context) => {
  const issues = []

  commit.notes.forEach((note) => {
    note.title = 'BREAKING CHANGES'
  })

  commit.type = transformCommitType(commit.type)

  if (commit.scope === '*') {
    commit.scope = ''
  }

  if (typeof commit.hash === 'string') {
    commit.shortHash = commit.hash.substring(0, 7)
  }

  if (typeof commit.subject === 'string') {
    let url = context.repository
      ? `${context.host}/${context.owner}/${context.repository}`
      : context.repoUrl
    if (url) {
      url = `${url}/issues/`
      // Issue URLs.
      commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
        issues.push(issue)
        return `[#${issue}](${url}${issue})`
      })
    }
    if (context.host) {
      // User URLs.
      commit.subject = commit.subject.replace(
        /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
        (_, username) => {
          if (username.includes('/')) {
            return `@${username}`
          }

          return `[@${username}](${context.host}/${username})`
        }
      )
    }
  }

  // remove references that already appear in the subject
  commit.references = commit.references.filter((reference) => {
    if (issues.indexOf(reference.issue) === -1) {
      return true
    }

    return false
  })

  return commit
}

module.exports = {
  branch: 'master',
  parserOpts: {
    mergePattern: /^Merge pull request #(\d+) from (.*)$/,
    mergeCorrespondence: ['id', 'source']
  },
  writerOpts: { transform: customTransform },
  plugins: [
    ['@semantic-release/commit-analyzer'],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'docs/CHANGELOG.md',
        changelogTitle:
          '# 变更日志\n\n规范参考：[Conventional Commits](https://conventionalcommits.org)'
      }
    ],
    ['@semantic-release/npm', { npmPublish: false }],
    ['@semantic-release/github', { assets: ['dist_electron/*.*'] }],
    [
      '@semantic-release/git',
      { assets: ['docs/CHANGELOG.md', 'package.json'] }
    ]
  ]
}
