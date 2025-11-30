import { useState } from 'react';
import type { CompetitionItem } from '../../types';
import styles from './CompetitionItemForm.module.css';

interface CompetitionItemFormProps {
  item: CompetitionItem;
  onUpdate: (item: CompetitionItem) => void;
  onRemove: () => void;
}

export function CompetitionItemForm({ item, onUpdate, onRemove }: CompetitionItemFormProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const updateField = <K extends keyof CompetitionItem>(field: K, value: CompetitionItem[K]) => {
    onUpdate({ ...item, [field]: value });
  };

  const updateReview = (field: string, value: string) => {
    onUpdate({
      ...item,
      reviews: { ...item.reviews, [field]: value || undefined },
    });
  };

  const addFeature = () => {
    updateField('features', [...item.features, '']);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...item.features];
    newFeatures[index] = value;
    updateField('features', newFeatures);
  };

  const removeFeature = (index: number) => {
    updateField('features', item.features.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.headerInfo}>
          <span className={`${styles.expandIcon} ${isExpanded ? styles.expandIconOpen : ''}`}>
            ▶
          </span>
          <span className={item.name ? styles.name : styles.namePlaceholder}>
            {item.name || 'New Competitor'}
          </span>
          {item.website && <span className={styles.website}>({item.website})</span>}
          {item.positioning && !isExpanded && (
            <span className={styles.positioning}>{item.positioning}</span>
          )}
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.content}>
          {/* Basic Info */}
          <div className={styles.fieldGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Name *</label>
              <input
                className={styles.input}
                type="text"
                value={item.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Competitor name"
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Website *</label>
              <input
                className={styles.input}
                type="text"
                value={item.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
              <label className={styles.label}>Positioning</label>
              <textarea
                className={styles.textarea}
                value={item.positioning}
                onChange={(e) => updateField('positioning', e.target.value)}
                placeholder="How they position themselves in the market"
              />
            </div>
            <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
              <label className={styles.label}>Pricing Policy</label>
              <input
                className={styles.input}
                type="text"
                value={item.pricingPolicy}
                onChange={(e) => updateField('pricingPolicy', e.target.value)}
                placeholder="Their pricing model"
              />
            </div>
          </div>

          {/* Features */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Features</h4>
            <div className={styles.featuresList}>
              {item.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <input
                    className={`${styles.input} ${styles.featureInput}`}
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Feature description"
                  />
                  <button
                    className={styles.removeFeatureButton}
                    onClick={() => removeFeature(index)}
                    title="Remove feature"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button className={`secondary ${styles.addFeatureButton}`} onClick={addFeature}>
              + Add Feature
            </button>
          </div>

          {/* Reviews */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Reviews</h4>
            <div className={styles.fieldGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Trustpilot</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.reviews.trustpilot || ''}
                  onChange={(e) => updateReview('trustpilot', e.target.value)}
                  placeholder="Rating or link"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>G2</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.reviews.g2 || ''}
                  onChange={(e) => updateReview('g2', e.target.value)}
                  placeholder="Rating or link"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Reddit</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.reviews.reddit || ''}
                  onChange={(e) => updateReview('reddit', e.target.value)}
                  placeholder="Sentiment or link"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>GitHub</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.reviews.github || ''}
                  onChange={(e) => updateReview('github', e.target.value)}
                  placeholder="Stars or link"
                />
              </div>
              <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
                <label className={styles.label}>Other Reviews</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.reviews.other || ''}
                  onChange={(e) => updateReview('other', e.target.value)}
                  placeholder="Other review sources"
                />
              </div>
            </div>
          </div>

          {/* Business Metrics */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Business Metrics</h4>
            <div className={styles.fieldGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Crunchbase</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.crunchbaseLink || ''}
                  onChange={(e) => updateField('crunchbaseLink', e.target.value || undefined)}
                  placeholder="Crunchbase link"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Founded In</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.foundedIn || ''}
                  onChange={(e) => updateField('foundedIn', e.target.value || undefined)}
                  placeholder="Year founded"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Last Investment</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.lastInvestment || ''}
                  onChange={(e) => updateField('lastInvestment', e.target.value || undefined)}
                  placeholder="Amount and date"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Total Investments</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.totalInvestments || ''}
                  onChange={(e) => updateField('totalInvestments', e.target.value || undefined)}
                  placeholder="Total raised"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Monthly Visits</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.monthlyVisits || ''}
                  onChange={(e) => updateField('monthlyVisits', e.target.value || undefined)}
                  placeholder="Traffic estimate"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Clients Amount</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.clientsAmount || ''}
                  onChange={(e) => updateField('clientsAmount', e.target.value || undefined)}
                  placeholder="Number of clients"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>LinkedIn</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.linkedinLink || ''}
                  onChange={(e) => updateField('linkedinLink', e.target.value || undefined)}
                  placeholder="LinkedIn link"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Headcount Growth</label>
                <input
                  className={styles.input}
                  type="text"
                  value={item.headcountGrowth || ''}
                  onChange={(e) => updateField('headcountGrowth', e.target.value || undefined)}
                  placeholder="Growth rate"
                />
              </div>
              <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
                <label className={styles.label}>Comments</label>
                <textarea
                  className={styles.textarea}
                  value={item.comments || ''}
                  onChange={(e) => updateField('comments', e.target.value || undefined)}
                  placeholder="Additional insights"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
