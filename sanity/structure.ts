import type { StructureResolver } from 'sanity/structure'
import { BookIcon, CaseIcon, DocumentIcon, EyeOpenIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('IntelliDelve CMS')
    .items([
      // Blog Posts Section
      S.listItem()
        .title('Blog Posts')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Blog Posts')
            .items([
              S.listItem()
                .title('Published Posts')
                .icon(EyeOpenIcon)
                .child(
                  S.documentList()
                    .title('Published Posts')
                    .filter('_type == "blog" && status == "published"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Draft Posts')
                .icon(DocumentIcon)
                .child(
                  S.documentList()
                    .title('Draft Posts')
                    .filter('_type == "blog" && status == "draft"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('All Posts')
                .child(
                  S.documentList()
                    .title('All Blog Posts')
                    .filter('_type == "blog"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                )
            ])
        ),

      // Case Studies Section
      S.listItem()
        .title('Case Studies')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Case Studies')
            .items([
              S.listItem()
                .title('Featured Case Studies')
                .child(
                  S.documentList()
                    .title('Featured Case Studies')
                    .filter('_type == "caseStudy" && featured == true && status == "published"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Published Case Studies')
                .child(
                  S.documentList()
                    .title('Published Case Studies')
                    .filter('_type == "caseStudy" && status == "published"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Draft Case Studies')
                .child(
                  S.documentList()
                    .title('Draft Case Studies')
                    .filter('_type == "caseStudy" && status == "draft"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('By Industry')
                .child(
                  S.list()
                    .title('Case Studies by Industry')
                    .items([
                      'Banking & Financial Services',
                      'Healthcare & Medical',
                      'Technology',
                      'Education & Academic',
                      'Government & Public Sector',
                      'Manufacturing & Industrial',
                      'Legal Services',
                      'Insurance',
                      'Real Estate',
                      'Transportation & Logistics',
                      'Energy & Utilities',
                      'Retail & Consumer',
                      'Non-Profit',
                      'Other'
                    ].map(industry =>
                      S.listItem()
                        .title(industry)
                        .child(
                          S.documentList()
                            .title(`${industry} Case Studies`)
                            .filter('_type == "caseStudy" && industry == $industry')
                            .params({ industry })
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        )
                    ))
                ),
              S.listItem()
                .title('All Case Studies')
                .child(
                  S.documentList()
                    .title('All Case Studies')
                    .filter('_type == "caseStudy"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                )
            ])
        ),

      // Divider
      S.divider(),

      // All Documents (fallback)
      ...S.documentTypeListItems().filter(
        (listItem) => !['blog', 'caseStudy'].includes(listItem.getId()!)
      )
    ])